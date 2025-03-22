// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const companyProtectedRoutes = ["/company/dashboard"];
  const isCompanyProtectedRoute = companyProtectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Auth paths
  const authPaths = ["/company/login", "/company/register"];
  const isAuthPath = authPaths.some((route) => path === route);

  // Check if user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic for company routes
  if (isCompanyProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/company/login", request.url));
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/company/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: ["/company/dashboard/:path*", "/company/login", "/company/register"],
};
