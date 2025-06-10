import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { path, timestamp } = await request.json()

    // Store page view analytics (optional - only if you want to track usage)
    await executeQuery("INSERT INTO page_views (path, timestamp, ip_address) VALUES (?, ?, ?)", [
      path,
      timestamp,
      request.headers.get("x-forwarded-for") || "unknown",
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    // Silently fail - analytics shouldn't break the app
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
