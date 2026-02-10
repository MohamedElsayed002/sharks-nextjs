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
  const res = await fetch(`${BASE}/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }
  
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const token = getToken(req)
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  const body = await req.json().catch(() => ({}))
  const { sellerId, serviceId } = body
  if (!sellerId) {
    return NextResponse.json({ message: "sellerId is required" }, { status: 400 })
  }
  const res = await fetch(`${BASE}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sellerId, serviceId: serviceId || undefined }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }
  return NextResponse.json(data)
}
