import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { jwt } = await request.json();
  const cookie = await cookies();
  cookie.set("jwt", jwt, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });
  return new Response(null, { status: 200 });
}
