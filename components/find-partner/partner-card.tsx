"use client"

import { FindPartner } from "@/types"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, MapPin, MessageCircle } from "lucide-react"
import { displayName, initials, DESCRIPTION_MAX_LENGTH } from "./utils"

export interface PartnerCardProps {
  partner: FindPartner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const locale = useLocale()
  const t = useTranslations()

  const description =
    partner.partnerDescription && partner.partnerDescription.length > DESCRIPTION_MAX_LENGTH
      ? `${partner.partnerDescription.slice(0, DESCRIPTION_MAX_LENGTH)}…`
      : partner.partnerDescription

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar className="h-14 w-14 shrink-0 border-2 border-muted">
          {partner.imageUrl ? (
            <AvatarImage src={partner.imageUrl} alt={displayName(partner)} />
          ) : null}
          <AvatarFallback className="text-base bg-primary/10 text-primary">
            {initials(partner)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <CardTitle className="text-base font-semibold leading-tight">
            {displayName(partner)}
          </CardTitle>
          {(partner.location || partner.country) && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              {partner.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {partner.location}
                </span>
              )}
              {partner.country && (
                <Badge variant="secondary" className="font-normal">
                  {partner.country}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        {description ? (
          <p className="text-sm text-muted-foreground line-clamp-4">
            {description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No description yet.
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <Button asChild variant="outline" className="w-full gap-2">
          <Link href={`/${locale}/find-partner/${partner._id}`}>
            <Info className="h-4 w-4" />
            {t("more-info")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
