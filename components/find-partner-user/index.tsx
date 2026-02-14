"use client"

import { getUserFindPartner } from "@/actions"
import { FindPartner } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, User } from "lucide-react"
import { displayName, initials } from "@/components/find-partner/utils"
import { PartnerContactCard } from "./PartnerContactCard"

export function FindPartnerUser({ id }: { id: string }) {
  const t = useTranslations("findPartnerUser")
  const { data: partner, isLoading, error } = useQuery<FindPartner>({
    queryKey: ["find-partner-user", id],
    queryFn: () => getUserFindPartner(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !partner) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : t("load-error")}
        </p>
      </div>
    )
  }

  const name = displayName(partner)

  return (
    <div className="w-full md:max-w-7xl  mx-auto px-4 py-8">
      <Card className="overflow-hidden border-0 bg-muted/30 shadow-none">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              {partner.imageUrl ? (
                <AvatarImage src={partner.imageUrl} alt={name} />
              ) : null}
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {initials(partner)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {name}
              </h1>
              <p className="text-muted-foreground">{t("looking-for-partner")}</p>
              {(partner.location || partner.country) && (
                <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground sm:justify-start">
                  <MapPin className="size-4 shrink-0" />
                  <span>
                    {[partner.location, partner.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
        <main className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <User className="size-5" />
                {t("about")}
              </h2>
            </CardHeader>
            <CardContent>
              {partner.partnerDescription ? (
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {partner.partnerDescription}
                </p>
              ) : (
                <p className="text-muted-foreground italic">{t("no-description")}</p>
              )}
            </CardContent>
          </Card>
        </main>

        <aside>
          <PartnerContactCard partner={partner} />
        </aside>
      </div>
    </div>
  )
}
