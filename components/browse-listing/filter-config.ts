/**
 * Single source of truth for browse listing sidebar filters.
 * Add or edit filter sections here; Filters.tsx renders from this config.
 */

export const FILTER_PARAM_KEYS = {
  category: "category",
  incomeSource: "incomeSource",
  profitable: "profitable",
} as const

export type FilterParamKey = keyof typeof FILTER_PARAM_KEYS

/** Filter section shown in the sidebar (collapsible, like Category). */
export interface FilterSectionConfig {
  id: FilterParamKey
  /** i18n key under browseListing (e.g. "category", "income-source") */
  labelKey: string
  /** single = one choice (radio-style); multi = multiple checkboxes */
  type: "single" | "multi"
  /**
   * "dynamic" = options passed at runtime (e.g. categories, income sources).
   * Otherwise array of { value, labelKey } for static options.
   */
  options: "dynamic" | { value: string; labelKey: string }[]
}

export const BROWSE_LISTING_FILTERS: FilterSectionConfig[] = [
  {
    id: "category",
    labelKey: "category",
    type: "single",
    options: "dynamic",
  },
  {
    id: "incomeSource",
    labelKey: "income-source",
    type: "multi",
    options: "dynamic",
  },
  {
    id: "profitable",
    labelKey: "profitable-only",
    type: "single",
    options: [{ value: "true", labelKey: "yes" }],
  },
]
