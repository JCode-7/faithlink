import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret-key-change-in-production")

export type UserSession = {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
}

export async function createSession(user: {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
}) {
  try {
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    cookies().set({
      name: "faith-link-session",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    })

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    }
  } catch (error) {
    console.error("Session creation error:", error)
    throw new Error("Failed to create session")
  }
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const sessionCookie = cookies().get("faith-link-session")
    if (!sessionCookie?.value) {
      return null
    }

    const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET)
    return {
      id: payload.id as number,
      email: payload.email as string,
      username: payload.username as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
    }
  } catch (error) {
    return null
  }
}

export async function endSession() {
  cookies().delete("faith-link-session")
}
