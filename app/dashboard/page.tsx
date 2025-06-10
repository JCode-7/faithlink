"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Users,
  Plus,
  Search,
  Filter,
  Flag,
  MoreHorizontal,
  Loader2,
} from "lucide-react"
import { getPostsAction, createPostAction, toggleLikeAction } from "@/app/actions/posts"
import { signOutAction } from "@/app/actions/auth"

interface Post {
  id: number
  author: string
  authorInitials: string
  content: string
  post_type: "discussion" | "verse" | "prayer"
  timestamp: string
  likes_count: number
  comments_count: number
  isLiked: boolean
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState({ content: "", postType: "discussion" })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  // Load posts on component mount
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setIsLoading(true)
    try {
      const result = await getPostsAction()
      if (result.success) {
        setPosts(result.posts)
      } else {
        setError(result.error || "Failed to load posts")
      }
    } catch (error) {
      setError("Failed to load posts")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (postId: number) => {
    startTransition(async () => {
      try {
        const result = await toggleLikeAction(postId)
        if (result.success) {
          // Optimistically update the UI
          setPosts((prev) =>
            prev.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likes_count: post.isLiked ? post.likes_count - 1 : post.likes_count + 1,
                  }
                : post,
            ),
          )
        }
      } catch (error) {
        console.error("Failed to toggle like:", error)
      }
    })
  }

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) return

    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append("content", newPost.content)
        formData.append("postType", newPost.postType)

        const result = await createPostAction(formData)

        if (result.success) {
          setNewPost({ content: "", postType: "discussion" })
          // Reload posts to show the new one
          await loadPosts()
        } else {
          setError(result.error || "Failed to create post")
        }
      } catch (error) {
        setError("Failed to create post")
      }
    })
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || post.post_type === filterType
    return matchesSearch && matchesFilter
  })

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "verse":
        return "bg-purple-100 text-purple-800"
      case "prayer":
        return "bg-green-100 text-green-800"
      case "discussion":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case "verse":
        return "Bible Verse"
      case "prayer":
        return "Prayer Request"
      case "discussion":
        return "Discussion"
      default:
        return "Post"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your faith journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Faith-Link</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome to the community!</span>
            <form action={signOutAction}>
              <Button variant="ghost" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      FL
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Community Member</CardTitle>
                    <CardDescription>@faithlink_user</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>🙏 Active in community</p>
                  <p>✨ Spreading faith and love</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Bible Study Groups
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find Communities
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Prayer Wall
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="feed" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Community Feed</TabsTrigger>
                <TabsTrigger value="create">Create Post</TabsTrigger>
                <TabsTrigger value="groups">My Groups</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {/* Search and Filter */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search posts, verses, or users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full sm:w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Posts</SelectItem>
                          <SelectItem value="discussion">Discussions</SelectItem>
                          <SelectItem value="verse">Bible Verses</SelectItem>
                          <SelectItem value="prayer">Prayer Requests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Error Display */}
                {error && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                      <p className="text-red-600">{error}</p>
                      <Button variant="outline" onClick={() => setError("")} className="mt-2">
                        Dismiss
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Posts Feed */}
                <div className="space-y-6">
                  {filteredPosts.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <p className="text-gray-500">No posts found. Be the first to share something!</p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredPosts.map((post) => (
                      <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                  {post.authorInitials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{post.author}</p>
                                <p className="text-sm text-gray-500">{post.timestamp}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPostTypeColor(post.post_type)}>
                                {getPostTypeLabel(post.post_type)}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLike(post.id)}
                                className={post.isLiked ? "text-red-500" : "text-gray-500"}
                                disabled={isPending}
                              >
                                <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                                {post.likes_count}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {post.comments_count}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="create" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Share with the Community</CardTitle>
                    <CardDescription>
                      Share your thoughts, verses, or prayer requests with fellow believers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <Select
                      value={newPost.postType}
                      onValueChange={(value) => setNewPost((prev) => ({ ...prev, postType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discussion">Discussion</SelectItem>
                        <SelectItem value="verse">Bible Verse</SelectItem>
                        <SelectItem value="prayer">Prayer Request</SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder={
                        newPost.postType === "verse"
                          ? "Share a meaningful Bible verse and your reflection..."
                          : newPost.postType === "prayer"
                            ? "Share your prayer request with the community..."
                            : "Start a discussion about faith, life, or spiritual growth..."
                      }
                      value={newPost.content}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                      className="min-h-32"
                      disabled={isPending}
                    />

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Remember: All posts are moderated to maintain a respectful environment
                      </p>
                      <Button
                        onClick={handleCreatePost}
                        disabled={!newPost.content.trim() || isPending}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sharing...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Share Post
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="groups" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Young Adults Ministry</CardTitle>
                      <CardDescription>Ages 18-30 • 234 members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        A community for young adults navigating faith, career, and relationships
                      </p>
                      <Button variant="outline" className="w-full">
                        View Group
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bible Study Circle</CardTitle>
                      <CardDescription>Weekly Studies • 89 members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Join us for weekly Bible studies and deep scriptural discussions
                      </p>
                      <Button variant="outline" className="w-full">
                        View Group
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Prayer Warriors</CardTitle>
                      <CardDescription>Prayer Focus • 156 members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Dedicated to intercession and supporting each other through prayer
                      </p>
                      <Button variant="outline" className="w-full">
                        View Group
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="pt-6 text-center">
                      <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <CardTitle className="text-gray-600 mb-2">Join More Groups</CardTitle>
                      <CardDescription className="mb-4">
                        Discover communities that match your interests and faith journey
                      </CardDescription>
                      <Button variant="outline">Browse Groups</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
