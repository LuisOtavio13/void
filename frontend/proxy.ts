import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/registro", "/pages/home", "/pages/explore"];

function isPublicRoute(pathname: string) {
  if (publicRoutes.includes(pathname)) return true;
  if (pathname.startsWith("/pages/user/")) return true;
  if (pathname.startsWith("/posts/")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  const pathname = request.nextUrl.pathname;
  const publicRoute = isPublicRoute(pathname);

  if (jwt && (pathname === "/login" || pathname === "/registro")) {
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
