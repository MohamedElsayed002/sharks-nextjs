import { NextRequest, NextResponse } from "next/server"

const BASE = process.env.BASE_URL!

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization")
  if (auth?.startsWith("Bearer ")) return auth.slice(7)
  return req.cookies.get("access_token")?.value ?? null
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getToken(req)
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  const { id } = await params
  if (id === "unread-count") {
    const res = await fetch(`${BASE}/conversations/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json().catch(() => ({ count: 0 }))
    if (!res.ok) {
      if (res.status === 404) return NextResponse.json({ count: 0 })
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  }
  const res = await fetch(`${BASE}/conversations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }
  return NextResponse.json(data)
}
