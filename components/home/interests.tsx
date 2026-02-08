"use client"

import { Check, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MOCK_LISTINGS = [
  { category: "Ecommerce | Beauty", multiple: "3x", price: "USD $1,500,000" },
  { category: "SaaS | AI", multiple: "4x", price: "€965,000" },
  { category: "Content | Sports", multiple: "3.2x", price: "SAR 480,000" },
] as const

export const Interests = () => {
  const t = useTranslations("interests")
  const locale = useLocale()

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-18">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left card: Buy & Sell End-to-End */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100/90 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl text-center font-bold text-foreground sm:text-2xl">
            {t("buyCardTitle")}
          </h3>
          <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
            {t("buyCardDesc")}
          </p>
          <ul className="mt-4 flex  justify-center items-center gap-2">
            <li className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Check className="size-5 shrink-0 text-emerald-600" aria-hidden />
              {t("buyFeature1")}
            </li>
            <li className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Check className="size-5 shrink-0 text-emerald-600" aria-hidden />
              {t("buyFeature2")}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="border-primary text-primary" asChild>
              <Link href={`/${locale}/browse-listing`}>{t("browseBusinesses")}</Link>
            </Button>
            <Button asChild>
              <Link href={`/${locale}/add-service`}>{t("sellNow")}</Link>
            </Button>
          </div>
          {/* Embedded mock-up: listings preview */}
          <div className="mt-8 rounded-xl border border-neutral-200/80 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <MoreHorizontal className="size-5 text-muted-foreground" />
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                readOnly
                placeholder={t("mockSearchPlaceholder")}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm text-muted-foreground"
              />
            </div>
            <ul className="space-y-3">
              {MOCK_LISTINGS.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-2 rounded-lg border border-neutral-100 bg-neutral-50/80 px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-foreground">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.multiple} · {item.price}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-primary">
                    {t("viewListing")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right card: Select Services for Your Deal */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-emerald-200/60 bg-emerald-50/80 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl text-center font-bold text-foreground sm:text-2xl">
            {t("servicesCardTitle")}
          </h3>
          <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
            {t("servicesCardDesc")}
          </p>
          <ul className="mt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            {[
              t("servicesFeature1"),
              t("servicesFeature2"),
              t("servicesFeature3"),
              t("servicesFeature4"),
              t("servicesFeature5"),
            ].map((label, i) => (
              <li
                key={i}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <Check className="size-4 shrink-0 text-emerald-600" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="border-primary text-primary" asChild>
              <Link href={`/${locale}/find-partner`}>{t("viewServices")}</Link>
            </Button>
          </div>
          {/* Embedded mock-up: services grid */}
          <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { key: "mockDueDiligence", className: "col-span-2" },
              { key: "mockLegal", className: "" },
              { key: "mockInsurance", className: "" },
              { key: "mockFinance", className: "" },
              { key: "mockPayments", className: "" },
            ].map(({ key, className }) => (
              <div
                key={key}
                className={cn(
                  "flex items-center justify-center rounded-lg border border-emerald-200/60 bg-white/80 px-3 py-4 text-xs font-medium text-muted-foreground",
                  className
                )}
              >
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
