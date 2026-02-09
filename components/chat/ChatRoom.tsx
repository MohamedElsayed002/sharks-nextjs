"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { useRef, useEffect } from "react"
import Link from "next/link"
import { useAuthStore } from "@/context/user"
import {
  getConversation,
  getMessages,
  sendMessage,
  type Message,
} from "@/lib/conversations-api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Send } from "lucide-react"
import { toast } from "sonner"

function formatMessageTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ChatRoom({ conversationId }: { conversationId: string }) {
  const t = useTranslations("chat")
  const locale = useLocale()
  const token = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)
  const queryClient = useQueryClient()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: conversation, isLoading: convLoading, error: convError } = useQuery({
    queryKey: ["conversation", conversationId, token],
    queryFn: () => getConversation(token!, conversationId),
    enabled: !!token && !!conversationId,
  })

  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", conversationId, token],
    queryFn: () => getMessages(token!, conversationId, { limit: 50 }),
    enabled: !!token && !!conversationId,
  })

  const sendMutation = useMutation({
    mutationFn: (content: string) => sendMessage(token!, conversationId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] })
      queryClient.invalidateQueries({ queryKey: ["conversations"] })
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : t("send-error"))
    },
  })

  const messages = messagesData?.messages ?? []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = inputRef.current
    const content = input?.value?.trim()
    if (!content || sendMutation.isPending) return
    sendMutation.mutate(content)
    input!.value = ""
  }

  if (!token || !user) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>{t("login-required")}</p>
          <Link href={`/${locale}/login`} className="text-primary underline mt-2 inline-block">
            {t("go-to-login")}
          </Link>
        </CardContent>
      </Card>
    )
  }

  if (convLoading || convError) {
    if (convError) {
      return (
        <Card>
          <CardContent className="py-8 text-center text-destructive">
            {convError instanceof Error ? convError.message : t("load-error")}
          </CardContent>
        </Card>
      )
    }
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const other = conversation?.participants?.find((p) => p._id !== user._id)
  const otherName = other?.name ?? t("unknown-user")

  return (
    <div className="flex flex-col w-full h-[calc(100vh-6rem)] min-h-[400px] rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Sticky header */}
      <div className="flex items-center gap-3 shrink-0 px-4 py-3 border-b bg-muted/30">
        <Button variant="ghost" size="icon" className="shrink-0" asChild>
          <Link href={`/${locale}/chat`}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold truncate">{otherName}</h1>
        </div>
      </div>

      {/* Message area - full width, scrollable */}
      <div className="flex-1 flex flex-col min-h-0 bg-muted/20">
        {messagesLoading ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <Skeleton className="w-full max-w-md h-48 rounded-xl" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
            <p className="text-sm">{t("no-messages")}</p>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-4xl mx-auto w-full">
            {messages.map((msg) => {
              const senderId = typeof msg.senderId === "object" && msg.senderId && "_id" in msg.senderId
                ? (msg.senderId as { _id: string })._id
                : String(msg.senderId)
              const isMe = senderId === user._id
              return (
                <li
                  key={msg._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border rounded-bl-md text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                    <p
                      className={`text-xs mt-1.5 ${
                        isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {formatMessageTime(msg.createdAt)}
                    </p>
                  </div>
                </li>
              )
            })}
            <div ref={messagesEndRef} />
          </ul>
        )}

        {/* Input bar - full width */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 p-4 bg-card border-t"
        >
          <div className="flex gap-3 max-w-4xl mx-auto w-full">
            <Input
              ref={inputRef}
              placeholder={t("type-message")}
              className="flex-1 rounded-xl h-12 px-4 text-base border-2 focus-visible:ring-2"
              maxLength={4000}
              disabled={sendMutation.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 rounded-xl shrink-0"
              disabled={sendMutation.isPending}
            >
              <Send className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
