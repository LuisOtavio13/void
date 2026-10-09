import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [ "/login", "/registro"];


export function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  const pathname = request.nextUrl.pathname;
  const publicRoute = publicRoutes.includes(pathname);

  if (jwt && publicRoute) {
    return NextResponse.redirect(new URL("/pages/home", request.url));
  }

  if (!jwt && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};