"use client"

import { useCallback, useState, useEffect } from "react"
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
import { Filters } from "./Filters"
import { ListingCard } from "./ListingCard"
import type { Product } from "@/actions"

type SortOption = "newest" | "oldest"

interface BrowseListingViewProps {
  products: Product[]
  categories: string[]
  locale: string
  initialSearch: string
  initialCategory: string
  initialSort: SortOption
}

function getDetailForLocale(product: Product, locale: string) {
  const lang = locale === "ar" ? "ar" : "en"
  const detail = product.details?.find((d) => d.lang === lang)
  return detail ?? product.details?.[0]
}

function updateSearchParams(
  current: URLSearchParams,
  updates: { search?: string; category?: string; sort?: string }
) {
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
  return next
}

export function BrowseListingView({
  products,
  categories,
  locale,
  initialSearch,
  initialCategory,
  initialSort,
}: BrowseListingViewProps) {
  const t = useTranslations("browseListing")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(initialSearch)
  useEffect(() => setSearchInput(initialSearch), [initialSearch])

  const applyParams = useCallback(
    (updates: { search?: string; category?: string; sort?: string }) => {
      const next = updateSearchParams(searchParams, updates)
      router.push(`${pathname}?${next.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyParams({ search: searchInput })
  }

  const handleCategorySelect = (category: string) => {
    applyParams({ category: category || "" })
  }

  const handleSortChange = (value: string) => {
    applyParams({ sort: value })
  }

  const handleClearAll = () => {
    setSearchInput("")
    applyParams({ search: "", category: "" })
  }

  return (
    <div className="flex gap-6 w-full max-w-7xl mx-auto px-4 py-6">
      {/* Left sidebar - Search & Filters */}
      <aside className="w-full shrink-0 md:w-[280px] lg:w-[320px]">
        <div className="sticky top-4 rounded-lg border bg-card p-4 shadow-sm space-y-4">
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <label className="text-sm font-medium" htmlFor="search-title">
              {t("search-by-title")}
            </label>
            <div className="flex gap-2">
              <Input
                id="search-title"
                type="text"
                placeholder={t("search-placeholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="secondary" aria-label={t("search-placeholder")}>
                <Search className="size-4" />
              </Button>
            </div>
          </form>
          <Filters
            categories={categories}
            selectedCategory={initialCategory}
            onCategorySelect={handleCategorySelect}
            onClearAll={handleClearAll}
          />
        </div>
      </aside>

      {/* Right column - Listings */}
      <section className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {products.length} {t("listings")}
          </p>
          <Select
            value={initialSort}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder={t("sort-by")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t("sort-newest")}</SelectItem>
              <SelectItem value="oldest">{t("sort-oldest")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
            {t("no-listings")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => {
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
