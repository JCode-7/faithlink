"use server"

import bcrypt from "bcryptjs"
import { createUser, getUserByEmail, getUserByUsername } from "@/lib/database"
import { createSession, endSession } from "@/lib/session"
import { redirect } from "next/navigation"

export async function signUpAction(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!firstName || !lastName || !username || !email || !password) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  if (username.length < 3) {
    return { error: "Username must be at least 3 characters long" }
  }

  try {
    const existingUserByEmail = await getUserByEmail(email)
    if (existingUserByEmail) {
      return { error: "User with this email already exists" }
    }

    const existingUserByUsername = await getUserByUsername(username)
    if (existingUserByUsername) {
      return { error: "Username is already taken" }
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await createUser({
      username,
      email,
      firstName,
      lastName,
      passwordHash,
    })

    const newUser = await getUserByEmail(email)
    if (!newUser) {
      return { error: "Failed to create account" }
    }

    await createSession(newUser)
    return { success: true, message: "Account created successfully!" }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "Failed to create account. Please try again." }
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return { error: "Invalid email or password" }
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    await createSession(user)
    return { success: true, message: "Signed in successfully!" }
  } catch (error) {
    console.error("Sign in error:", error)
    return { error: "Failed to sign in. Please try again." }
  }
}

export async function signOutAction() {
  await endSession()
  redirect("/")
}

export async function checkUsernameAvailability(username: string) {
  if (username.length < 3) {
    return { available: false, message: "Username must be at least 3 characters" }
  }

  try {
    const existingUser = await getUserByUsername(username)
    return {
      available: !existingUser,
      message: existingUser ? "Username is taken" : "Username is available",
    }
  } catch (error) {
    console.error("Username check error:", error)
    return { available: false, message: "Error checking username" }
  }
}
