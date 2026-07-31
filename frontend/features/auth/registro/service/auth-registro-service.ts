import { ErrorLogin } from "../../login/types/errorLogin";

export async function registerService(
  data: { 
    email: string; 
    password: string; 
    username: string 
  }
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (response.status === 409) {
    throw new ErrorLogin("email já cadastrado", response.status);
  }

  if (response.status === 400 && "errors" in result) {
    throw new ErrorLogin(result.errors, response.status);
  }

  if (!response.ok) {
    throw new ErrorLogin("erro ao criar conta", response.status);
  }

  return result;
}