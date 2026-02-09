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

interface Owner {
  _id: string
  name: string
  email: string
  phone?: string
  location?: string
}

interface SellerCardProps {
  owner: Owner
  serviceId?: string
}

export function SellerCard({ owner, serviceId }: SellerCardProps) {
  const t = useTranslations("singleService")
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
    setStarting(true)
    try {
      const conversation = await createOrGetConversation(token, {
        sellerId: owner._id,
        serviceId,
      })
      router.push(`/${locale}/chat/${conversation._id}`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to start conversation")
    } finally {
      setStarting(false)
    }
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <h3 className="font-semibold">{t("seller-info")}</h3>
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
              <span className="font-medium">{owner.name}</span>
            </div>
            {owner.location && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <MapPin className="size-4 text-muted-foreground" />
                <span className="text-sm">{owner.location}</span>
              </div>
            )}
            {user ? (
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

