"use client";

import {
  CardButtonSubmit,
  CardForm,
  CardInput,
} from "@/features/auth/components/card-auth";

import { Separator } from "@/shared/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { useLogin, useLoginForm } from "../hooks/login-hook";

export function LoginFormAuth() {
  const form = useLoginForm();
  const { signIn, loading } = useLogin();
  return (
    <CardForm onSubmit={form.handleSubmit(signIn)}>
      <CardInput
        {...form.register("email")}
        placeholder="Email"
        error={form.formState.errors.email?.message}
      />
      <CardInput
        {...form.register("password")}
        placeholder="Password"
        error={form.formState.errors.password?.message}
      />
      <CardButtonSubmit loading={loading} />
    </CardForm>
  );
}
export function AuthSocialLogin() {
  return (
    <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 font-medium py-3 rounded-[5px] transition-all disabled:opacity-50">
      <FcGoogle size={22} />
      Login com Google
    </button>
  );
}
export function AuthSeparator() {
  return (
    <div className="flex items-center gap-4 my-6 w-full">
      <Separator className="flex-1 bg-zinc-700" />

      <p className="text-zinc-500 text-sm">ou</p>

      <Separator className="flex-1 bg-zinc-700" />
    </div>
  );
}
