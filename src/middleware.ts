import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  // 로그인이 필요한 페이지 경로
  const authRequiredPages = ["/myPage"];

  const { pathname } = req.nextUrl;

  if (!session && authRequiredPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if ((session && pathname === "/sign-in") || pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/pokemonList", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
