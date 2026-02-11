"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DollarSign,
  LayoutGrid,
  Link2,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export const INCOME_SOURCE_IDS = ["ads", "affiliate", "services", "other"] as const
export type IncomeSourceId = (typeof INCOME_SOURCE_IDS)[number]

interface IncomeOption {
  id: IncomeSourceId
  icon: LucideIcon
  titleKey: string
  descriptionKey: string
}

const OPTIONS: IncomeOption[] = [
  { id: "ads", icon: LayoutGrid, titleKey: "ads-title", descriptionKey: "ads-description" },
  { id: "affiliate", icon: Link2, titleKey: "affiliate-title", descriptionKey: "affiliate-description" },
  { id: "services", icon: DollarSign, titleKey: "services-title", descriptionKey: "services-description" },
  { id: "other", icon: MoreHorizontal, titleKey: "other-title", descriptionKey: "other-description" },
]

interface IncomeSourcesStepProps {
  onBack: () => void
  onContinue: (selectedIds: IncomeSourceId[]) => void
}

export function IncomeSourcesStep({ onBack, onContinue }: IncomeSourcesStepProps) {
  const t = useTranslations("sell.income-sources")
  const tf = useTranslations("sell.form")
  const [selected, setSelected] = useState<Set<IncomeSourceId>>(new Set())

  const toggle = (id: IncomeSourceId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleContinue = () => {
    onContinue(Array.from(selected))
  }

  return (
    <div className="mx-auto my-10 max-w-2xl px-4">
      <h2 className="text-center text-xl font-bold">{t("heading")}</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        {t("subtitle")}
      </p>

      <div className="mt-8 space-y-3">
        {OPTIONS.map((opt) => {
          const isChecked = selected.has(opt.id)
          return (
            <div
              key={opt.id}
              role="button"
              tabIndex={0}
              onClick={() => toggle(opt.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggle(opt.id)
                }
              }}
              className={cn(
                "flex w-full cursor-pointer items-start gap-4 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted/30",
                isChecked && "border-l-4 border-l-orange-500"
              )}
            >
              <opt.icon className="mt-0.5 h-6 w-6 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{t(opt.titleKey)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(opt.descriptionKey)}
                </p>
              </div>
              <div onClick={(e) => e.stopPropagation()} role="presentation">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggle(opt.id)}
                  className="shrink-0"
                  aria-label={t(opt.titleKey)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-8">
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground hover:bg-transparent hover:underline"
          onClick={onBack}
        >
          &lt; {tf("back")}
        </Button>
        <Button
          type="button"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleContinue}
        >
          {tf("continue")}
        </Button>
      </div>
    </div>
  )
}
