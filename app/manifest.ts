import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Faith-Link - Christian Community Platform",
    short_name: "Faith-Link",
    description: "Connect, share, and grow in faith with believers worldwide",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["social", "lifestyle", "education"],
    lang: "en",
    orientation: "portrait-primary",
  }
}
