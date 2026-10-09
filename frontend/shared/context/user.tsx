"use client";
import React from "react";
import { User } from "@/shared/types/UserType";
export async function getUser(): Promise<User | null>  {
      const res = await fetch("/api/auth/getuser");
      if (!res.ok) {
        if (res.status === 401) {
          return null;
        }
        throw new Error(String(res.status));
      }
      return (await res.json()) as User;
};

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof Error && (error.message === "403")) {
              router.push("/login");
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}