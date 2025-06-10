"use server"

import { revalidatePath } from "next/cache"
import { createPost, getPosts, toggleLike, moderateContent, getUserLikes } from "@/lib/database"
import { getSession } from "@/lib/session"

export async function createPostAction(formData: FormData) {
  const session = await getSession()
  if (!session) {
    return { error: "You must be signed in to create a post" }
  }

  const content = formData.get("content") as string
  const postType = formData.get("postType") as "discussion" | "verse" | "prayer"

  if (!content || !postType) {
    return { error: "Content and post type are required" }
  }

  if (content.length < 10) {
    return { error: "Post content must be at least 10 characters long" }
  }

  if (content.length > 2000) {
    return { error: "Post content must be less than 2000 characters" }
  }

  try {
    const moderation = moderateContent(content)
    if (!moderation.isAppropriate) {
      return { error: `Post rejected: ${moderation.reason}` }
    }

    await createPost({
      userId: session.id,
      content,
      postType,
    })

    revalidatePath("/dashboard")
    return { success: true, message: "Post created successfully!" }
  } catch (error) {
    console.error("Create post error:", error)
    return { error: "Failed to create post. Please try again." }
  }
}

export async function getPostsAction(page = 1, limit = 20) {
  try {
    const offset = (page - 1) * limit
    const posts = (await getPosts(limit, offset)) as any[]

    const session = await getSession()
    let userLikes: number[] = []

    if (session && posts.length > 0) {
      const postIds = posts.map((post: any) => post.id)
      userLikes = await getUserLikes(session.id, postIds)
    }

    const postsWithLikes = posts.map((post: any) => ({
      ...post,
      isLiked: userLikes.includes(post.id),
      authorInitials: `${post.first_name.charAt(0)}${post.last_name.charAt(0)}`,
      author: `${post.first_name} ${post.last_name.charAt(0)}.`,
      timestamp: formatTimestamp(post.created_at),
    }))

    return { success: true, posts: postsWithLikes }
  } catch (error) {
    console.error("Get posts error:", error)
    return { error: "Failed to load posts", posts: [] }
  }
}

export async function toggleLikeAction(postId: number) {
  const session = await getSession()
  if (!session) {
    return { error: "You must be signed in to like posts" }
  }

  try {
    const result = await toggleLike(session.id, postId)
    revalidatePath("/dashboard")
    return { success: true, action: result.action }
  } catch (error) {
    console.error("Toggle like error:", error)
    return { error: "Failed to update like" }
  }
}

function formatTimestamp(timestamp: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`

  return new Date(timestamp).toLocaleDateString()
}
