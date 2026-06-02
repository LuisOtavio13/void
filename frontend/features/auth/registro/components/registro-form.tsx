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

export function RegistroForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroSchema>({
    resolver: zodResolver(registroSchema),
  });
  async function onSubmit(data: RegistroSchema) {
    setLoading(true);

    console.log(data);
    setLoading(false);
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
