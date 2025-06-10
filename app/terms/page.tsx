import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Scale, Users, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service - Community Guidelines and Rules",
  description:
    "Read Faith-Link's terms of service and community guidelines. Learn about our rules for maintaining a respectful, faith-centered environment for all believers.",
  openGraph: {
    title: "Terms of Service - Faith-Link",
    description: "Read our terms of service and community guidelines for a respectful faith community.",
  },
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-gray-600 mt-4">
            These terms govern your use of Faith-Link and help us maintain a respectful, faith-centered community.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="w-5 h-5 mr-2 text-blue-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By creating an account or using Faith-Link, you agree to be bound by these Terms of Service and our
                Privacy Policy. If you don't agree with these terms, please don't use our platform.
              </p>
              <p className="text-gray-600">
                We may update these terms from time to time. We'll notify you of significant changes, and your continued
                use of Faith-Link constitutes acceptance of the updated terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  What We Encourage
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-6">
                  <li>Sharing your faith journey and spiritual insights</li>
                  <li>Supporting fellow believers with prayer and encouragement</li>
                  <li>Engaging in respectful discussions about faith and scripture</li>
                  <li>Sharing meaningful Bible verses and spiritual content</li>
                  <li>Building authentic Christian friendships and community</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  What's Not Allowed
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-6">
                  <li>Hate speech, harassment, or discrimination of any kind</li>
                  <li>Content that promotes violence or harmful activities</li>
                  <li>Spam, commercial advertising, or promotional content</li>
                  <li>Sharing false information or misleading content</li>
                  <li>Content that violates others' privacy or intellectual property</li>
                  <li>Inappropriate or offensive language or imagery</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Account Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Security</h4>
                <p className="text-gray-600">
                  You're responsible for maintaining the security of your account and password. Don't share your login
                  credentials with others, and notify us immediately if you suspect unauthorized access.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Accurate Information</h4>
                <p className="text-gray-600">
                  Please provide accurate information when creating your account and keep it updated. False or
                  misleading information may result in account suspension.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Age Requirements</h4>
                <p className="text-gray-600">
                  You must be at least 13 years old to use Faith-Link. Users under 18 should have parental permission.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Content and Conduct
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Content Ownership</h4>
                <p className="text-gray-600">
                  You retain ownership of the content you post on Faith-Link. However, by posting content, you grant us
                  a license to display, distribute, and moderate that content on our platform.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Moderation</h4>
                <p className="text-gray-600">
                  We reserve the right to review, moderate, or remove content that violates our community guidelines.
                  Our goal is to maintain a safe, respectful environment for all believers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Reporting Violations</h4>
                <p className="text-gray-600">
                  If you see content that violates our guidelines, please report it using our reporting tools. We take
                  all reports seriously and will investigate promptly.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enforcement and Consequences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Warning System</h4>
                <p className="text-gray-600">
                  For minor violations, we may issue warnings and provide guidance on our community standards. We
                  believe in restoration and helping community members grow.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Suspension</h4>
                <p className="text-gray-600">
                  Repeated violations or serious misconduct may result in temporary or permanent account suspension.
                  We'll always try to work with users to resolve issues when possible.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Appeals Process</h4>
                <p className="text-gray-600">
                  If you believe your account was suspended in error, you can appeal the decision by contacting our
                  support team at appeals@faithlink.app.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                While we strive to keep Faith-Link available 24/7, we may occasionally need to perform maintenance or
                updates that temporarily affect service availability. We'll provide advance notice when possible.
              </p>
              <p className="text-gray-600">
                Faith-Link is provided "as is" without warranties of any kind. We're committed to providing a reliable
                service but cannot guarantee uninterrupted access.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact and Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about these terms or need support, we're here to help:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>General Support:</strong> support@faithlink.app
                </p>
                <p>
                  <strong>Community Guidelines:</strong> community@faithlink.app
                </p>
                <p>
                  <strong>Appeals:</strong> appeals@faithlink.app
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                We're committed to building this community together and welcome your feedback and suggestions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to join our faith-centered community?</p>
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
