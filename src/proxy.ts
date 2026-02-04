import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Routes that require authentication
// const protectedRoutes = ["/checkout", "/address"];
const protectedRoutes = ["/admin"];

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Only allow access to protectedRoutes if the user is logged in
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    // Redirect unauthenticated users to sign-in
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Allow access if authenticated or route is not protected
  return NextResponse.next();
}
