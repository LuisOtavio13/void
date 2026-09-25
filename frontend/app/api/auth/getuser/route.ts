import { cookies } from "next/headers";

export async function GET() {
  const cookie = await cookies();
  const jwt = cookie.get("jwt");
  if (!jwt) {
    return new Response(null, { status: 401 });
  }
  const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/me", {
    headers: {
      Authorization: `Bearer ${jwt.value}`,
    },
  });
  if (!user.ok) {
    cookie.delete("jwt");
    return new Response(null, { status: user.status });
  }
  const userData = await user.json();
  userData.jwt = jwt.value;
  return new Response(JSON.stringify(userData), { status: 200 });
}
