// src/middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token
    // デバッグログ（必要に応じて削除）
    console.log("Middleware token:", token)

    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
      return new Response("Access Denied", { status: 403 })
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)