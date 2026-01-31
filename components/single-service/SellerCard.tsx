"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, User } from "lucide-react"

interface Owner {
  _id: string
  name: string
  email: string
  phone?: string
  location?: string
}

interface SellerCardProps {
  owner: Owner
}

export function SellerCard({ owner }: SellerCardProps) {
  const t = useTranslations("singleService")
  const [showContact, setShowContact] = useState(false)

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
            <a
              href={`mailto:${owner.email}`}
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
            >
              <Mail className="size-4 text-muted-foreground" />
              <span className="text-sm">{owner.email}</span>
            </a>
            {owner.phone && (
              <a
                href={`tel:${owner.phone}`}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
              >
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-sm">{owner.phone}</span>
              </a>
            )}
            {owner.location && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <MapPin className="size-4 text-muted-foreground" />
                <span className="text-sm">{owner.location}</span>
              </div>
            )}
            <Button variant="outline" className="w-full" asChild>
              <a href={`mailto:${owner.email}`}>
                <Mail className="mr-2 size-4" />
                {t("send-email")}
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
