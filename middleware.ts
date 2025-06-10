import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const protectedRoutes = ["/dashboard", "/profile", "/settings"]
const authRoutes = ["/signin", "/signup"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const sessionCookie = request.cookies.get("faith-link-session")
  const isAuthenticated = sessionCookie ? await verifyToken(sessionCookie.value) : false

  if (protectedRoutes.some((route) => path.startsWith(route)) && !isAuthenticated) {
    const url = new URL("/signin", request.url)
    url.searchParams.set("redirect", path)
    return NextResponse.redirect(url)
  }

  if (authRoutes.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

async function verifyToken(token: string): Promise<boolean> {
  const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret-key-change-in-production")

  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch (error) {
    return false
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/signin", "/signup"],
}
