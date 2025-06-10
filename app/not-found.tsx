"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            The page you're looking for doesn't exist or may have been moved. Let's get you back to the community!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="flex items-center w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-3">Looking for something specific?</p>
            <div className="space-y-2">
              <Link href="/signup" className="block text-blue-600 hover:underline text-sm">
                Join our community
              </Link>
              <Link href="/signin" className="block text-blue-600 hover:underline text-sm">
                Sign in to your account
              </Link>
              <Link href="/about" className="block text-blue-600 hover:underline text-sm">
                Learn about Faith-Link
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
