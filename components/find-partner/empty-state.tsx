"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export function FindPartnerEmptyState() {
  const t = useTranslations()

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed bg-muted/30 flex flex-col items-center justify-center py-16 px-6 text-center"
      )}
    >
      <p className="text-muted-foreground">{t("find-partner-empty")}</p>
    </div>
  )
}
