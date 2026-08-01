"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
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
  const queryClient = useQueryClient();

  
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      queryClient.setQueryData(["user"], {
        jwt: result.jwt,
        isAdmin: result.isAdmin,
        name: result.name,
        photo: result.photo,
        email: result.email,
      });

      toast.success("Login realizado com sucesso");
      router.push("/pages/home");
    },
    onError: (err: unknown) => {
      if (!(err instanceof ErrorLogin)) return;

      if (err.isValidationError() && Array.isArray(err.message)) {
        (err.message as string[]).forEach((e) => errorToast(e));
      } else {
        errorToast(err.message as string);
      }
    },
  });

  return {
    loading: mutation.isPending, 
    signIn: mutation.mutate,     
  };
}
