"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ServiceDescriptionProps {
  description: string
}

export function ServiceDescription({ description }: ServiceDescriptionProps) {
  const t = useTranslations("singleService")
  if (!description?.trim()) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">{t("about-listing")}</h3>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
