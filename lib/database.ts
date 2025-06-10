import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "faithlink_db",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  charset: "utf8mb4",
}

let pool: mysql.Pool | null = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const connection = getPool()
    const [results] = await connection.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Database operation failed")
  }
}

export async function createUser(userData: {
  username: string
  email: string
  firstName: string
  lastName: string
  passwordHash: string
}) {
  const query = `
    INSERT INTO users (username, email, first_name, last_name, password_hash)
    VALUES (?, ?, ?, ?, ?)
  `
  const params = [userData.username, userData.email, userData.firstName, userData.lastName, userData.passwordHash]
  return await executeQuery(query, params)
}

export async function getUserByEmail(email: string) {
  const query = "SELECT * FROM users WHERE email = ? LIMIT 1"
  const results = (await executeQuery(query, [email])) as any[]
  return results[0] || null
}

export async function getUserByUsername(username: string) {
  const query = "SELECT * FROM users WHERE username = ? LIMIT 1"
  const results = (await executeQuery(query, [username])) as any[]
  return results[0] || null
}

export async function getUserById(id: number) {
  const query = "SELECT * FROM users WHERE id = ? LIMIT 1"
  const results = (await executeQuery(query, [id])) as any[]
  return results[0] || null
}

export async function createPost(postData: {
  userId: number
  content: string
  postType: "discussion" | "verse" | "prayer"
}) {
  const query = `
    INSERT INTO posts (user_id, content, post_type)
    VALUES (?, ?, ?)
  `
  const params = [postData.userId, postData.content, postData.postType]
  return await executeQuery(query, params)
}

export async function getPosts(limit = 20, offset = 0) {
  const query = `
    SELECT 
      p.id,
      p.content,
      p.post_type,
      p.likes_count,
      p.comments_count,
      p.created_at,
      u.first_name,
      u.last_name,
      u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.is_approved = true
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `
  return await executeQuery(query, [limit, offset])
}

export async function toggleLike(userId: number, postId: number) {
  try {
    const checkQuery = "SELECT id FROM likes WHERE user_id = ? AND post_id = ? LIMIT 1"
    const existingLike = (await executeQuery(checkQuery, [userId, postId])) as any[]

    if (existingLike.length > 0) {
      const deleteQuery = "DELETE FROM likes WHERE user_id = ? AND post_id = ?"
      await executeQuery(deleteQuery, [userId, postId])
      const updateQuery = "UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = ?"
      await executeQuery(updateQuery, [postId])
      return { action: "unliked" }
    } else {
      const insertQuery = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)"
      await executeQuery(insertQuery, [userId, postId])
      const updateQuery = "UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?"
      await executeQuery(updateQuery, [postId])
      return { action: "liked" }
    }
  } catch (error) {
    console.error("Toggle like error:", error)
    throw new Error("Failed to update like")
  }
}

export async function getUserLikes(userId: number, postIds: number[]) {
  if (postIds.length === 0) return []
  const placeholders = postIds.map(() => "?").join(",")
  const query = `SELECT post_id FROM likes WHERE user_id = ? AND post_id IN (${placeholders})`
  const params = [userId, ...postIds]
  const results = (await executeQuery(query, params)) as any[]
  return results.map((row: any) => row.post_id)
}

export function moderateContent(content: string): { isAppropriate: boolean; reason?: string } {
  const inappropriateWords = [
    "hate",
    "stupid",
    "idiot",
    "kill",
    "die",
    "death",
    "damn",
    "hell",
    "shut up",
    "dumb",
    "loser",
    "worthless",
    "pathetic",
  ]

  const lowerContent = content.toLowerCase()
  for (const word of inappropriateWords) {
    if (lowerContent.includes(word)) {
      return {
        isAppropriate: false,
        reason: "Content contains inappropriate language. Please maintain respectful communication.",
      }
    }
  }

  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
  if (capsRatio > 0.7 && content.length > 10) {
    return {
      isAppropriate: false,
      reason: "Please avoid excessive use of capital letters.",
    }
  }

  return { isAppropriate: true }
}

export async function testConnection() {
  try {
    const query = "SELECT 1 as test"
    await executeQuery(query)
    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return { success: false, message: "Database connection failed" }
  }
}
