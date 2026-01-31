"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ServiceIncomeSourcesProps {
  incomeSources?: string[]
}

export function ServiceIncomeSources({
  incomeSources,
}: ServiceIncomeSourcesProps) {
  const t = useTranslations("singleService")
  if (!incomeSources?.length) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">{t("income-sources")}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {incomeSources.map((source) => (
            <Badge key={source} variant="secondary" className="text-sm font-normal">
              {source}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
