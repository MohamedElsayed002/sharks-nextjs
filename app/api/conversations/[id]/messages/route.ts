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
  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get("cursor") ?? ""
  const limit = searchParams.get("limit") ?? "50"
  const q = new URLSearchParams()
  if (cursor) q.set("cursor", cursor)
  q.set("limit", limit)
  const res = await fetch(`${BASE}/conversations/${id}/messages?${q}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }
  return NextResponse.json(data)
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getToken(req)
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  const { id } = await params
  const body = await req.json().catch(() => ({}))
  const { content } = body
  if (content == null || String(content).trim() === "") {
    return NextResponse.json({ message: "content is required" }, { status: 400 })
  }
  const res = await fetch(`${BASE}/conversations/${id}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: String(content).trim() }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }
  return NextResponse.json(data)
}
