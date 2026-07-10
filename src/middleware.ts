import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { UserRole } from "@/types";

const ROLE_GATES: Array<{ prefix: string; roles: UserRole[] }> = [
  { prefix: "/admin", roles: ["ADMIN"] },
  { prefix: "/mentor", roles: ["MENTOR", "ADMIN"] },
  { prefix: "/apply", roles: ["APPLICANT", "GUARDIAN", "ADMIN"] },
  { prefix: "/workspace", roles: ["APPLICANT", "MENTOR", "GUARDIAN", "ADMIN"] },
];

const PUBLIC_EXACT_PATHS = new Set(["/mentor/signup"]);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (PUBLIC_EXACT_PATHS.has(pathname)) return NextResponse.next();

  const gate = ROLE_GATES.find((g) => pathname.startsWith(g.prefix));
  if (!gate) return NextResponse.next();

  const role = req.auth?.user?.role;

  if (!role) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!gate.roles.includes(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/mentor/:path*", "/apply/:path*", "/workspace/:path*"],
};
