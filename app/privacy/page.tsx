import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Lock, Eye, Database, UserCheck } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - How We Protect Your Information",
  description:
    "Learn how Faith-Link protects your privacy and handles your personal information. We're committed to keeping your data secure while you connect with the faith community.",
  openGraph: {
    title: "Privacy Policy - Faith-Link",
    description: "Learn how we protect your privacy and handle your personal information.",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Faith-Link</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-600 mt-4">
            At Faith-Link, we're committed to protecting your privacy while you connect with our faith community.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Information</h4>
                <p className="text-gray-600">
                  When you create an account, we collect your name, email address, username, and password. This
                  information is necessary to provide you with access to our platform and personalize your experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content You Share</h4>
                <p className="text-gray-600">
                  We store the posts, comments, prayer requests, and other content you choose to share on our platform.
                  This content is visible to other community members as intended by the platform's social features.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <p className="text-gray-600">
                  We collect information about how you use Faith-Link, including your interactions with posts, groups
                  you join, and features you use. This helps us improve our platform and provide better service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Platform Operation</h4>
                <p className="text-gray-600">
                  We use your information to operate Faith-Link, including authenticating your account, displaying your
                  content to other users, and facilitating community interactions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Communication</h4>
                <p className="text-gray-600">
                  We may send you important updates about our service, security alerts, and community guidelines. You
                  can control notification preferences in your account settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Safety and Security</h4>
                <p className="text-gray-600">
                  We use your information to maintain the safety and security of our platform, including content
                  moderation and preventing abuse.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Community Visibility</h4>
                <p className="text-gray-600">
                  Content you post on Faith-Link is visible to other community members. Your profile information (name
                  and username) is also visible to help others connect with you.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Third-Party Sharing</h4>
                <p className="text-gray-600">
                  We do not sell, rent, or share your personal information with third parties for marketing purposes.
                  Your faith journey and personal information remain within our community.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Requirements</h4>
                <p className="text-gray-600">
                  We may disclose information if required by law or to protect the safety of our users and community.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-red-600" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Encryption</h4>
                <p className="text-gray-600">
                  All data transmission is encrypted using industry-standard SSL/TLS protocols. Your password is
                  securely hashed and never stored in plain text.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Access Controls</h4>
                <p className="text-gray-600">
                  We implement strict access controls to ensure only authorized personnel can access user data, and only
                  when necessary for platform operation and support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regular Security Audits</h4>
                <p className="text-gray-600">
                  We regularly review and update our security practices to protect against emerging threats and ensure
                  your information remains secure.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-indigo-600" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Control</h4>
                <p className="text-gray-600">
                  You can update your profile information, change your privacy settings, and control who can see your
                  content through your account settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Access</h4>
                <p className="text-gray-600">
                  You can request a copy of your personal data or ask us to delete your account and associated
                  information. Contact us at privacy@faithlink.app for such requests.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Notification Preferences</h4>
                <p className="text-gray-600">
                  You can control what notifications you receive and how you receive them through your account settings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or how we handle your information, please don't
                hesitate to contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> privacy@faithlink.app
                </p>
                <p>
                  <strong>Address:</strong> Faith-Link Privacy Team, [Your Address]
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                We're committed to addressing your concerns and maintaining your trust as we build this faith community
                together.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to join our secure, faith-centered community?</p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Join Faith-Link Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
