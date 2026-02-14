"use client"

import { useCallback, useState, useEffect, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Filters, type FilterState, type DynamicFilterOptions } from "./Filters"
import { ListingCard } from "./ListingCard"
import type { FilterParamKey } from "./filter-config"
import type { Product } from "@/types"

type SortOption = "newest" | "oldest"

interface BrowseListingViewProps {
  products: Product[]
  categories: string[]
  incomeSources: string[]
  locale: string
  initialSearch: string
  initialCategory: string
  initialIncomeSource: string[]
  initialProfitable: boolean
  initialSort: SortOption
}

function getDetailForLocale(product: Product, locale: string) {
  const lang = locale === "ar" ? "ar" : "en"
  const detail = product.details?.find((d) => d.lang === lang)
  return detail ?? product.details?.[0]
}

interface ParamUpdates {
  search?: string
  category?: string
  sort?: string
  incomeSource?: string[]
  profitable?: boolean
}

function updateSearchParams(current: URLSearchParams, updates: ParamUpdates) {
  const next = new URLSearchParams(current)
  if (updates.search !== undefined) {
    if (updates.search.trim()) next.set("search", updates.search.trim())
    else next.delete("search")
  }
  if (updates.category !== undefined) {
    if (updates.category.trim()) next.set("category", updates.category.trim())
    else next.delete("category")
  }
  if (updates.sort !== undefined) next.set("sort", updates.sort)
  if (updates.incomeSource !== undefined) {
    if (updates.incomeSource.length) next.set("incomeSource", updates.incomeSource.join(","))
    else next.delete("incomeSource")
  }
  if (updates.profitable !== undefined) {
    if (updates.profitable) next.set("profitable", "true")
    else next.delete("profitable")
  }
  return next
}

export function BrowseListingView({
  products,
  categories,
  incomeSources,
  locale,
  initialSearch,
  initialCategory,
  initialIncomeSource,
  initialProfitable,
  initialSort,
}: BrowseListingViewProps) {
  const t = useTranslations("browseListing")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(initialSearch)
  useEffect(() => setSearchInput(initialSearch), [initialSearch])

  const filterState: FilterState = useMemo(
    () => ({
      category: initialCategory,
      incomeSource: initialIncomeSource,
      profitable: initialProfitable ? "true" : "",
    }),
    [initialCategory, initialIncomeSource, initialProfitable]
  )

  const dynamicOptions: DynamicFilterOptions = useMemo(
    () => ({
      category: categories,
      incomeSource: incomeSources,
    }),
    [categories, incomeSources]
  )

  const applyParams = useCallback(
    (updates: ParamUpdates) => {
      const next = updateSearchParams(searchParams, updates)
      router.push(`${pathname}?${next.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyParams({ search: searchInput })
  }

  const handleFilterChange = useCallback(
    (id: FilterParamKey, value: string | string[]) => {
      if (id === "category") applyParams({ category: typeof value === "string" ? value : "" })
      else if (id === "incomeSource") applyParams({ incomeSource: Array.isArray(value) ? value : [] })
      else if (id === "profitable") applyParams({ profitable: value === "true" })
    },
    [applyParams]
  )

  const handleSortChange = (value: string) => {
    applyParams({ sort: value })
  }

  const handleClearAll = () => {
    setSearchInput("")
    applyParams({
      search: "",
      category: "",
      incomeSource: [],
      profitable: false,
    })
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (initialIncomeSource.length) {
        const sources = p.incomeSources ?? []
        const hasMatch = initialIncomeSource.some((s) =>
          sources.some((src) => src.toLowerCase() === s.toLowerCase())
        )
        if (!hasMatch) return false
      }
      if (initialProfitable && !p.isProfitable) return false
      return true
    })
  }, [products, initialIncomeSource, initialProfitable])

  return (
    <div className="mx-auto w-full max-w-7xl flex flex-col gap-4 px-3 py-4 sm:gap-6 sm:px-4 sm:py-6 md:flex-row">
      <aside className="w-full shrink-0 md:sticky md:top-4 md:h-fit md:w-[280px] lg:w-[320px]">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="search-title">
              {t("search-by-title")}
            </label>
            <div className="flex gap-2">
              <Input
                id="search-title"
                type="text"
                placeholder={t("search-placeholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="min-w-0 flex-1"
              />
              <Button type="submit" size="icon" variant="secondary" className="shrink-0" aria-label={t("search-placeholder")}>
                <Search className="size-4" />
              </Button>
            </div>
          </form>
          <div className="mt-4">
            <Filters
              filterState={filterState}
              dynamicOptions={dynamicOptions}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} {t("listings")}
          </p>
          <Select value={initialSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full text-slate-800 sm:w-[180px]">
              <SelectValue placeholder={t("sort-by")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t("sort-newest")}</SelectItem>
              <SelectItem value="oldest">{t("sort-oldest")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-muted-foreground sm:p-12">
            {t("no-listings")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const detail = getDetailForLocale(product, locale)
              const title = detail?.title ?? "—"
              const description = detail?.description ?? ""
              return (
                <ListingCard
                  key={product._id}
                  product={product}
                  title={title}
                  description={description}
                />
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
