"use client"

import { useTranslations } from "next-intl"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import {
  BROWSE_LISTING_FILTERS,
  type FilterParamKey,
  type FilterSectionConfig,
} from "./filter-config"

export type FilterState = {
  category: string
  incomeSource: string[]
  profitable: string
}

export type DynamicFilterOptions = Partial<Record<FilterParamKey, string[]>>

interface FiltersProps {
  filterState: FilterState
  dynamicOptions: DynamicFilterOptions
  onFilterChange: (id: FilterParamKey, value: string | string[]) => void
  onClearAll: () => void
}

function getOptionsForSection(
  section: FilterSectionConfig,
  dynamicOptions: DynamicFilterOptions
): { value: string; labelKey?: string }[] {
  if (section.options === "dynamic") {
    const list = dynamicOptions[section.id] ?? []
    return list.map((value) => ({ value }))
  }
  return section.options
}

function getSelectedForSection(
  section: FilterSectionConfig,
  filterState: FilterState
): string | string[] {
  const raw = filterState[section.id]
  return raw ?? (section.type === "multi" ? [] : "")
}

export function Filters({
  filterState,
  dynamicOptions,
  onFilterChange,
  onClearAll,
}: FiltersProps) {
  const t = useTranslations("browseListing")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {}
    BROWSE_LISTING_FILTERS.forEach((f) => (o[f.id] = true))
    return o
  })

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">{t("filters")}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="min-h-9 text-muted-foreground hover:text-foreground text-xs"
          onClick={onClearAll}
        >
          {t("clear-all")}
        </Button>
      </div>

      {BROWSE_LISTING_FILTERS.map((section) => {
        const options = getOptionsForSection(section, dynamicOptions)
        const selected = getSelectedForSection(section, filterState)
        const isOpen = openSections[section.id] ?? true

        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-lg border border-slate-200"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium hover:bg-slate-50 transition-colors min-h-[44px] sm:py-2.5"
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
            >
              <span>{t(section.labelKey)}</span>
              {isOpen ? (
                <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
              )}
            </button>
            {isOpen && (
              <div className="space-y-2 border-t border-slate-200 px-3 pb-3 pt-2">
                {options.length === 0 ? (
                  <p className="py-2 text-xs text-muted-foreground">
                    {t("no-categories")}
                  </p>
                ) : (
                  options.map((opt) => {
                    const value = opt.value
                    const label = opt.labelKey ? t(opt.labelKey) : value
                    const isChecked =
                      section.type === "multi"
                        ? Array.isArray(selected) && selected.includes(value)
                        : selected === value

                    return (
                      <label
                        key={value}
                        className="flex min-h-[40px] cursor-pointer items-center gap-3 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:min-h-0"
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => {
                            if (section.type === "multi") {
                              const current = Array.isArray(selected)
                                ? selected
                                : []
                              const next = current.includes(value)
                                ? current.filter((v) => v !== value)
                                : [...current, value]
                              onFilterChange(section.id, next)
                            } else {
                              onFilterChange(
                                section.id,
                                isChecked ? "" : value
                              )
                            }
                          }}
                        />
                        <span className="truncate">{label}</span>
                      </label>
                    )
                  })
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
