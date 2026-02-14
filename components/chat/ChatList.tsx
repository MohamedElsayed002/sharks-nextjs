"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { useAuthStore } from "@/context/user"
import { getConversations } from "@/lib/conversations-api"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare } from "lucide-react"

function formatTime(dateStr: string | null) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60 * 60 * 1000) return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  if (diff < 24 * 60 * 60 * 1000) return d.toLocaleDateString(undefined, { weekday: "short" })
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

export function ChatList() {
  const t = useTranslations("chat")
  const locale = useLocale()
  const token = useAuthStore((s) => s.accessToken)
  const user = useAuthStore((s) => s.user)

  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ["conversations", token],
    queryFn: () => getConversations(token!),
    enabled: !!token,
  })

  if (!user || !token) {
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

  if (isLoading) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{t("messages")}</h1>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          {error instanceof Error ? error.message : t("load-error")}
        </CardContent>
      </Card>
    )
  }

  const list = conversations ?? []

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">{t("messages")}</h1>
      {list.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center text-muted-foreground">
            <MessageSquare className="mx-auto size-14 mb-4 opacity-40" />
            <p className="text-base">{t("no-conversations")}</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {list.map((conv) => {
            const other = conv.participants?.find((p) => p._id !== user._id)
            const name = other?.name ?? t("unknown-user")
            const unread = (conv.unreadCount ?? 0) > 0
            return (
              <li key={conv._id}>
                <Link href={`/${locale}/chat/${conv._id}`}>
                  <Card
                    className={cn(
                      "transition-all hover:bg-muted/50 hover:shadow-md hover:border-primary/20",
                      unread && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <CardContent className="flex items-center justify-between gap-4 py-4 px-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={cn("font-semibold truncate", unread && "text-foreground")}>
                            {name}
                          </p>
                          {unread && (
                            <span
                              className="shrink-0 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold"
                              aria-label={`${conv.unreadCount} unread from ${name}`}
                            >
                              {conv.unreadCount! > 99 ? "99+" : conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {conv.serviceId && typeof conv.serviceId === "object" && conv.serviceId._id
                            ? t("talking-about-listing")
                            : t("talking-about-find-partner")}
                        </p>
                        {conv.lastMessagePreview && (
                          <p className="text-sm text-muted-foreground truncate mt-0.5">
                            {conv.lastMessagePreview}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                        {formatTime(conv.lastMessageAt ?? conv.createdAt)}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
