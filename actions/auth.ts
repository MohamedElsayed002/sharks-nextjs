"use server"

export async function getMe(token: string) {
  const response = await fetch(`${process.env.BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.message ?? "Unauthorized")
  }
  return data
}
