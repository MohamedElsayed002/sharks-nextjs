"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, User, MessageSquareText } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/context/user"
import { createOrGetConversation } from "@/lib/conversations-api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FindPartner } from "@/types"
import { displayName } from "@/components/find-partner/utils"

export interface PartnerContactCardProps {
  partner: FindPartner
}

export function PartnerContactCard({ partner }: PartnerContactCardProps) {
  const t = useTranslations("findPartnerUser")
  const [showContact, setShowContact] = useState(false)
  const [starting, setStarting] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.accessToken)

  const handleStartConversation = async () => {
    if (!token || !user) {
      router.push(`/${locale}/login`)
      return
    }
    if (user._id === partner._id) {
      toast.error(t("cannot-chat-self"))
      return
    }
    setStarting(true)
    try {
      const conversation = await createOrGetConversation(token, {
        sellerId: partner._id,
        // no serviceId = find-partner conversation
      })
      router.push(`/${locale}/chat/${conversation._id}`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("start-error"))
    } finally {
      setStarting(false)
    }
  }

  const name = displayName(partner)

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <h3 className="font-semibold">{t("partner-info")}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showContact ? (
          <>
            <p className="text-sm text-muted-foreground">{t("interested-cta")}</p>
            <Button
              className="w-full"
              onClick={() => setShowContact(true)}
              size="lg"
            >
              {t("show-contact")}
            </Button>
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <User className="size-4 text-primary" />
              </div>
              <span className="font-medium">{name}</span>
            </div>
            {(partner.location || partner.country) && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <MapPin className="size-4 text-muted-foreground shrink-0" />
                <span className="text-sm">
                  {[partner.location, partner.country].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            {user && token ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleStartConversation}
                disabled={starting}
              >
                <MessageSquareText className="mr-2 size-4" />
                {starting ? t("starting-conversation") : t("start-conversation")}
              </Button>
            ) : (
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/${locale}/login`}>{t("login-to-start-conversation")}</Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
