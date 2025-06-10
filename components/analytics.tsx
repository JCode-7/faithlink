"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Google Analytics
    if (typeof window !== "undefined" && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname + searchParams.toString(),
      })
    }

    // Custom analytics for Faith-Link
    if (typeof window !== "undefined") {
      // Track page views
      fetch("/api/analytics/pageview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: pathname,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silently fail - analytics shouldn't break the app
      })
    }
  }, [pathname, searchParams])

  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
