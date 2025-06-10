import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, BookOpen, Shield, Star } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Our Mission to Connect Believers Worldwide",
  description:
    "Learn about Faith-Link's mission to create a safe, supportive Christian community where believers can connect, share their faith journey, and grow together in Christ.",
  openGraph: {
    title: "About Faith-Link - Our Mission to Connect Believers",
    description: "Learn about our mission to create a safe, supportive Christian community platform.",
  },
}

export default function AboutPage() {
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

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Faith-Link</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building a global community where believers can connect, share their faith journey, and support one
            another in growing closer to Christ.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Faith-Link exists to create meaningful connections between believers worldwide. We believe that faith
              grows stronger in community, and our platform provides a safe, supportive environment for Christians to
              share their journey.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you're seeking prayer, wanting to share a meaningful Bible verse, or looking for spiritual
              discussions, Faith-Link is your digital sanctuary for faith-based fellowship.
            </p>
            <p className="text-gray-600">
              Our commitment is to maintain a respectful, encouraging space where every believer feels welcomed and
              valued, regardless of their denomination or where they are in their faith journey.
            </p>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Community First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building authentic relationships and fostering genuine Christian fellowship online.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Safe Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Maintaining a respectful, moderated space where faith can be shared freely and safely.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  Biblical Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Grounding all interactions in Christian values and biblical principles of love and grace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Love & Compassion</h3>
              <p className="text-gray-600">
                Following Christ's example of unconditional love and showing compassion to all members of our community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unity in Diversity</h3>
              <p className="text-gray-600">
                Celebrating the diversity of the global church while maintaining unity in our shared faith in Jesus
                Christ.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Spiritual Growth</h3>
              <p className="text-gray-600">
                Encouraging and supporting each member's journey toward spiritual maturity and deeper relationship with
                God.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Story</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Faith-Link was born from a simple observation: while technology has connected the world, many believers
                still feel isolated in their faith journey. We saw the need for a dedicated space where Christians could
                come together, share their experiences, and support one another in a meaningful way.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our team consists of passionate believers from various backgrounds, united by our shared vision of
                creating a platform that honors God and serves His people. We're committed to building not just a social
                network, but a true community where faith can flourish.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every feature we develop, every policy we implement, and every decision we make is guided by our desire
                to create a space that reflects Christ's love and brings glory to God.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a movement that's connecting believers worldwide and strengthening faith through community.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
            >
              Start Your Faith Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
