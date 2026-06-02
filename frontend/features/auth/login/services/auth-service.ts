import { ErrorLogin } from "@/features/auth/login/types/errorLogin";
import { redirect } from "next/navigation";
import { saveCookie } from "@/lib/cookies/cookie";

export async function login(data: { email: string; password: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status === 401 || response.status === 403) {
    throw new ErrorLogin("email ou senha incorretos", response.status);
  }

  if (response.status === 400 && "errors" in result) {
    throw new ErrorLogin(result.errors, response.status);
  }

  if (!response.ok) {
    throw new ErrorLogin("erro ao fazer login", response.status);
  }

  await saveCookie(result.jwt);
  redirect("/pages/home");
  return result;
}
