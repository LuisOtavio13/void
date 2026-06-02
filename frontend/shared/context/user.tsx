"use client";
import React, { createContext } from "react";
import { User } from "@/shared/types/UserType";
import { Spinner } from "@/shared/components/ui/spinner";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

function UserFetcher({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/getuser");
      if (!res.ok) return null;
      return res.json() as Promise<User>;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          <Spinner className="relative size-10 animate-spin text-primary" />
        </div>
        <p className="mt-6 animate-pulse text-sm font-medium tracking-wide text-zinc-400">
          Carregando sessão...
        </p>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        setUser: (u) => queryClient.setQueryData(["user"], u),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserFetcher>{children}</UserFetcher>
    </QueryClientProvider>
  );
}
