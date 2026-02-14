"use client"

import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, FileText } from "lucide-react"
import type { Conversation, ConversationParticipant } from "@/lib/conversations-api"
import { cn } from "@/lib/utils"

function getServiceTitle(
  details: { lang: string; title: string }[] | undefined,
  locale: string
): string {
  if (!details?.length) return ""
  const lang = locale === "ar" ? "ar" : "en"
  const d = details.find((x) => x.lang === lang) ?? details[0]
  return d?.title ?? ""
}

function displayName(p: ConversationParticipant): string {
  const first = p.firstName?.trim()
  const last = p.lastName?.trim()
  if (first || last) return [first, last].filter(Boolean).join(" ")
  return p.name?.trim() || ""
}

function initials(p: ConversationParticipant): string {
  const name = displayName(p) || p.name
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase() || "?"
}

export function ChatSidebar({
  conversation,
  currentUserId,
}: {
  conversation: Conversation
  currentUserId: string
}) {
  const t = useTranslations("chat")
  const locale = useLocale()
  const service = conversation.serviceId
  const isAboutListing = service && typeof service === "object" && service._id
  const other = conversation.participants?.find((p) => p._id !== currentUserId)

  if (isAboutListing && service) {
    const title = getServiceTitle(service.details, locale)
    return (
      <Card className="overflow-hidden border bg-card">
        <CardHeader className="pb-1 pt-3 px-3 sm:pb-2 sm:pt-6 sm:px-6">
          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground">
            {t("talking-about")}
          </h3>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 px-3 pb-3 sm:px-6 sm:pb-6">
          <Link
            href={`/${locale}/browse-listing/${service._id}`}
            className="block rounded-lg border bg-muted/30 transition-colors hover:bg-muted/50"
          >
            {service.imageUrl ? (
              <div className="relative h-24 w-full overflow-hidden rounded-t-lg sm:aspect-video sm:h-auto">
                <Image
                  src={service.imageUrl}
                  alt={title || "Listing"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 340px) 100vw, 340px"
                />
              </div>
            ) : (
              <div className="flex h-24 w-full items-center justify-center rounded-t-lg bg-muted sm:aspect-video sm:h-auto">
                <FileText className="size-8 sm:size-10 text-muted-foreground" />
              </div>
            )}
            <div className="p-2 sm:p-3">
              <p className="line-clamp-2 text-sm sm:text-base font-medium">{title || t("talking-about-listing")}</p>
              {service.category && (
                <p className="mt-0.5 sm:mt-1 text-xs text-muted-foreground">{service.category}</p>
              )}
            </div>
          </Link>
          <p className="text-xs text-muted-foreground">
            <Link
              href={`/${locale}/browse-listing/${service._id}`}
              className="text-primary hover:underline"
            >
              {t("view-listing")} →
            </Link>
          </p>
        </CardContent>
      </Card>
    )
  }

  if (other) {
    const name = displayName(other) || other.name
    const locationLine = [other.location, other.country].filter(Boolean).join(", ")
    const description = other.partnerDescription?.trim()
    return (
      <Card className="overflow-hidden border bg-card">
        <CardHeader className="pb-1 pt-3 px-3 sm:pb-2 sm:pt-6 sm:px-6">
          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground">
            {t("talking-about")}
          </h3>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-3 pb-3 sm:px-6 sm:pb-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-muted">
              {other.imageUrl ? (
                <AvatarImage src={other.imageUrl} alt={name} />
              ) : null}
              <AvatarFallback className="text-sm sm:text-lg bg-primary/10 text-primary">
                {initials(other)}
              </AvatarFallback>
            </Avatar>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base font-semibold">{name}</p>
            {locationLine && (
              <div className="mt-0.5 sm:mt-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="size-3 sm:size-3.5 shrink-0" />
                <span className="truncate max-w-[180px] sm:max-w-none">{locationLine}</span>
              </div>
            )}
          </div>
          {description && (
            <div className="rounded-lg border bg-muted/20 p-2 sm:p-3">
              <p className={cn("text-xs sm:text-sm text-muted-foreground line-clamp-3 sm:line-clamp-4")}>
                {description}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            <Link
              href={`/${locale}/find-partner/${other._id}`}
              className="text-primary hover:underline"
            >
              {t("view-partner-profile")} →
            </Link>
          </p>
        </CardContent>
      </Card>
    )
  }

  return null
}
