"use client"

import {
  Cloud,
  Globe,
  Merge,
  MonitorPlay,
  Newspaper,
  ShieldQuestionMark,
  ShoppingCart,
  Smartphone,
  StoreIcon,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"

export type SellCategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface SellCategory {
  id: SellCategoryId
  icon: LucideIcon
  titleKey: string
  descriptionKey: string
}

const CATEGORIES: SellCategory[] = [
  { id: 1, icon: Newspaper, titleKey: "content-title", descriptionKey: "content-description" },
  { id: 2, icon: Cloud, titleKey: "saas-title", descriptionKey: "saas-description" },
  { id: 3, icon: ShoppingCart, titleKey: "ecommerce-title", descriptionKey: "ecommerce-description" },
  { id: 4, icon: Smartphone, titleKey: "mobile-app-title", descriptionKey: "mobile-app-description" },
  { id: 5, icon: MonitorPlay, titleKey: "youtube-social-title", descriptionKey: "youtube-social-description" },
  { id: 6, icon: StoreIcon, titleKey: "marketplace-title", descriptionKey: "marketplace-description" },
  { id: 7, icon: Merge, titleKey: "plugins-title", descriptionKey: "plugins-description" },
  { id: 8, icon: Globe, titleKey: "domain-title", descriptionKey: "domain-description" },
  { id: 9, icon: ShieldQuestionMark, titleKey: "other-title", descriptionKey: "other-description" },
]

interface CategoriesProps {
  onCategorySelect: (category: SellCategory) => void
}

export function Categories({ onCategorySelect }: CategoriesProps) {
  const t = useTranslations("sell.categories")

  return (
    <div className="mx-auto my-10 max-w-7xl">
      <h1 className="text-center text-xl font-bold">{t("heading")}</h1>
      <div className="mt-10 grid grid-cols-1 gap-6 rounded-lg md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category)}
            className="flex flex-col border p-4 text-left transition-colors hover:bg-muted/50"
          >
            <category.icon className="h-6 w-6" />
            <h2 className="mt-2 text-lg font-semibold rtl:text-right">{t(category.titleKey)}</h2>
            <p className="mt-1 text-sm text-muted-foreground rtl:text-right">{t(category.descriptionKey)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
