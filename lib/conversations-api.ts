/**
 * Client-side API for conversations. Use from components that have access to the auth store.
 * Pass the token from useAuthStore.getState().accessToken.
 */

export type ConversationParticipant = {
  _id: string
  name: string
  email?: string
}

export type Conversation = {
  _id: string
  participants: ConversationParticipant[]
  serviceId?: { _id: string; category?: string } | null
  lastMessageAt: string | null
  lastMessagePreview: string
  createdAt: string
  updatedAt: string
}

export type Message = {
  _id: string
  conversationId: string
  senderId: { _id: string; name?: string }
  content: string
  readBy?: string[]
  createdAt: string
}

export type MessagesResponse = {
  messages: Message[]
  nextCursor: string | null
  hasMore: boolean
}

async function fetchWithAuth(
  url: string,
  token: string,
  options?: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  })
}

export async function createOrGetConversation(
  token: string,
  body: { sellerId: string; serviceId?: string }
): Promise<Conversation> {
  const res = await fetchWithAuth("/api/conversations", token, {
    method: "POST",
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? "Failed to create conversation")
  return data
}

export async function getConversations(token: string): Promise<Conversation[]> {
  const res = await fetchWithAuth("/api/conversations", token)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? "Failed to load conversations")
  return Array.isArray(data) ? data : []
}

export async function getConversation(
  token: string,
  conversationId: string
): Promise<Conversation> {
  const res = await fetchWithAuth(`/api/conversations/${conversationId}`, token)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? "Failed to load conversation")
  return data
}

export async function getMessages(
  token: string,
  conversationId: string,
  opts?: { cursor?: string; limit?: number }
): Promise<MessagesResponse> {
  const params = new URLSearchParams()
  if (opts?.cursor) params.set("cursor", opts.cursor)
  if (opts?.limit != null) params.set("limit", String(opts.limit))
  const q = params.toString()
  const res = await fetchWithAuth(
    `/api/conversations/${conversationId}/messages${q ? `?${q}` : ""}`,
    token
  )
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? "Failed to load messages")
  return data
}

export async function sendMessage(
  token: string,
  conversationId: string,
  content: string
): Promise<Message> {
  const res = await fetchWithAuth(
    `/api/conversations/${conversationId}/messages`,
    token,
    {
      method: "POST",
      body: JSON.stringify({ content: content.trim() }),
    }
  )
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? "Failed to send message")
  return data
}
