"use client";

import { useUser } from "@/shared/hooks/use-user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchema,
} from "@/features/auth/login/schema/Login-schema";
import { login } from "@/features/auth/login/services/auth-service";
import { errorToast } from "@/shared/components/toast-error";
import { ErrorLogin } from "../types/errorLogin";
export function useLoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return form;
}

export function useLogin() {
  const router = useRouter();
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);

  async function signIn(data: LoginSchema) {
    setLoading(true);

    try {
      const result = await login(data);

      setUser({
        jwt: result.jwt,
        isAdmin: result.isAdmin,
        name: result.name,
        photo: result.photo,
        email: result.email,
      });

      toast.success("login realizado com sucesso");

      router.push("/pages/home");
    } catch (err: unknown) {
      if (!(err instanceof ErrorLogin)) return;

      if (err.isValidationError() && Array.isArray(err.message)) {
        (err.message as string[]).forEach((e) => errorToast(e));
      } else {
        errorToast(err.message as string);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    signIn,
  };
}
