import { NextResponse } from "next/server"
import { testConnection, executeQuery } from "@/lib/database"

export async function GET() {
  try {
    const connectionTest = await testConnection()

    if (!connectionTest.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: connectionTest.message,
        },
        { status: 500 },
      )
    }

    const userCount = await executeQuery("SELECT COUNT(*) as count FROM users")
    const postCount = await executeQuery("SELECT COUNT(*) as count FROM posts")

    return NextResponse.json({
      success: true,
      message: "Database connected successfully!",
      data: {
        userCount: (userCount as any)[0].count,
        postCount: (postCount as any)[0].count,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
