"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { signUpAction, checkUsernameAvailability } from "@/app/actions/auth"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [usernameStatus, setUsernameStatus] = useState<{
    available: boolean | null
    message: string
    checking: boolean
  }>({
    available: null,
    message: "",
    checking: false,
  })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    } else if (formData.username.length > 30) {
      newErrors.username = "Username cannot be longer than 30 characters"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }
    if (usernameStatus.available === false) {
      newErrors.username = "Username is not available"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkUsername = async (username: string) => {
    if (!username.trim()) {
      setUsernameStatus({ available: null, message: "", checking: false })
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameStatus({
        available: false,
        message: "Username can only contain letters, numbers, and underscores",
        checking: false,
      })
      return
    }

    if (username.length < 3) {
      setUsernameStatus({
        available: false,
        message: "Username must be at least 3 characters",
        checking: false,
      })
      return
    }

    if (username.length > 30) {
      setUsernameStatus({
        available: false,
        message: "Username cannot be longer than 30 characters",
        checking: false,
      })
      return
    }

    setUsernameStatus({ available: null, message: "Checking username...", checking: true })

    try {
      const result = await checkUsernameAvailability(username)
      setUsernameStatus({
        available: result.available,
        message: result.available ? "Username is available!" : "Username is already taken",
        checking: false,
      })
    } catch (error) {
      setUsernameStatus({
        available: false,
        message: "Error checking username",
        checking: false,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    startTransition(async () => {
      try {
        const formDataObj = new FormData()
        formDataObj.append("firstName", formData.firstName)
        formDataObj.append("lastName", formData.lastName)
        formDataObj.append("username", formData.username)
        formDataObj.append("email", formData.email)
        formDataObj.append("password", formData.password)

        const result = await signUpAction(formDataObj)

        if (result.error) {
          setErrors({ general: result.error })
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        setErrors({ general: "An unexpected error occurred" })
      }
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }))
    }

    if (field === "username" && typeof value === "string") {
      checkUsername(value)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-md">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Faith-Link</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
            <p className="text-gray-600">Create your account and start your faith journey with us</p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Fill in your details to join the Faith-Link community</CardDescription>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                    disabled={isPending}
                  />
                  {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                    disabled={isPending}
                  />
                  {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={
                      errors.username
                        ? "border-red-500"
                        : usernameStatus.available === true
                          ? "border-green-500"
                          : usernameStatus.available === false
                            ? "border-red-500"
                            : ""
                    }
                    placeholder="Choose a unique username"
                    disabled={isPending}
                  />
                  {usernameStatus.checking && <Loader2 className="absolute right-3 top-3 w-4 h-4 animate-spin" />}
                  {!usernameStatus.checking && usernameStatus.available === true && (
                    <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
                  )}
                  {!usernameStatus.checking && usernameStatus.available === false && (
                    <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-red-500" />
                  )}
                </div>
                {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                {!errors.username && usernameStatus.message && (
                  <p className={`text-sm mt-1 ${usernameStatus.available ? "text-green-500" : "text-red-500"}`}>
                    {usernameStatus.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  disabled={isPending}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  disabled={isPending}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
