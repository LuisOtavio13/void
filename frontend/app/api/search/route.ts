import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const termo = searchParams.get("termo") ?? "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}search?termo=${encodeURIComponent(termo)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return NextResponse.json(
      { message: error.message || "Erro ao buscar resultados" },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
