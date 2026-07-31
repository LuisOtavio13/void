"use client";

import { useState } from "react";
import { RegistroSchema } from "../schema/Registro";
import { useForm } from "react-hook-form";
import {
  CardButtonSubmit,
  CardForm,
  CardInput,
} from "@/features/auth/components/card-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema } from "../schema/Registro";
import {registerService} from "../service/auth-registro-service";
import { toast } from "sonner";
import { ErrorLogin } from "../../login/types/errorLogin";
import { errorToast } from "@/shared/components/toast-error";
import { saveCookie } from "@/lib/cookies/cookie";
import { useRouter } from "next/navigation";
export function RegistroForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroSchema>({
    resolver: zodResolver(registroSchema),
  });
  

const router = useRouter();

async function onSubmit(data: RegistroSchema) {
  setLoading(true);

  try {
    const result = await registerService({
      email: data.email,
      username: data.name,
      password: data.password,
    });

    await saveCookie(result.jwt);

    toast.success("conta criada com sucesso");

    router.push("/pages/home");

  } catch (err: unknown) {
    if (!(err instanceof ErrorLogin)) return;

    if (err.isValidationError() && Array.isArray(err.message)) {
      err.message.forEach((e) => errorToast(e));
    } else {
      errorToast(err.message as string);
    }

  } finally {
    setLoading(false);
  }
}
  return (
    <CardForm onSubmit={handleSubmit(onSubmit)}>
      <CardInput
        {...register("name")}
        placeholder="Name"
        error={errors.name?.message}
        id="name"
      />
      <CardInput
        {...register("email")}
        placeholder="Email"
        error={errors.email?.message}
        id="email"
      />
      <CardInput
        {...register("password")}
        placeholder="Password"
        type="password"
        error={errors.password?.message}
        id="password"
      />
      <CardButtonSubmit loading={loading} message="Registro" />
    </CardForm>
  );
}
