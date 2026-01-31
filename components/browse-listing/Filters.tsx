"use client"

import { useTranslations } from "next-intl"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface FiltersProps {
  categories: string[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
  onClearAll: () => void
}

export function Filters({
  categories,
  selectedCategory,
  onCategorySelect,
  onClearAll,
}: FiltersProps) {
  const t = useTranslations("browseListing")
  const [categoryOpen, setCategoryOpen] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{t("filters")}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground text-xs"
          onClick={onClearAll}
        >
          {t("clear-all")}
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          className="w-full flex items-center justify-between px-3 py-2.5 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
          onClick={() => setCategoryOpen(!categoryOpen)}
        >
          <span>{t("category")}</span>
          {categoryOpen ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>
        {categoryOpen && (
          <div className="px-3 pb-3 pt-0 space-y-2 border-t">
            {categories.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">{t("no-categories")}</p>
            ) : (
              categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  <Checkbox
                    checked={selectedCategory === cat}
                    onCheckedChange={() =>
                      onCategorySelect(selectedCategory === cat ? "" : cat)
                    }
                  />
                  <span className="truncate">{cat}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
