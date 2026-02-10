import { NextRequest, NextResponse } from "next/server"

const COOKIE_NAME = "access_token"
const MAX_AGE = 60 * 60 * 24 * 1 // 1 days

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = body?.token

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    const response = NextResponse.json({ success: true })
    const isProduction = process.env.NODE_ENV === "production"

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    })

    return response
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}
