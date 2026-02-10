import { NextRequest, NextResponse } from "next/server"

const BASE = process.env.BASE_URL!

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization")
  if (auth?.startsWith("Bearer ")) return auth.slice(7)
  return req.cookies.get("access_token")?.value ?? null
}

export async function GET(req: NextRequest) {
  const token = getToken(req)
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  const res = await fetch(`${BASE}/conversations/unread-count`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json().catch(() => ({ count: 0 }))
  console.log('data',data)
  if (!res.ok) {
    if (res.status === 404) {
      return NextResponse.json({ count: 0 })
    }
    return NextResponse.json(data, { status: res.status })
  }
  return NextResponse.json(data)
}
