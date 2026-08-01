"use client";
import React from "react";
import { User } from "@/shared/types/UserType";

export async function getUser()  {
      const res = await fetch("/api/auth/getuser");
      if (!res.ok) return null;
      return res.json() as Promise<User>;
};

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}