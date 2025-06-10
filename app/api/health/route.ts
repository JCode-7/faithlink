import { NextResponse } from "next/server"
import { testConnection } from "@/lib/database"

export async function GET() {
  try {
    const dbStatus = await testConnection()

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus.success ? "healthy" : "unhealthy",
        api: "healthy",
      },
      version: "1.0.0",
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
      },
      { status: 503 },
    )
  }
}
