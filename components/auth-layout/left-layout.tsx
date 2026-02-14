"use client"

import {
  TrendingUp,
  Store,
  Check,
  BarChart3,
  ShoppingCart,
  User,
} from "lucide-react"
import { useFormatter, useLocale, useTranslations } from "next-intl"

export const LeftDesign = () => {
  const t = useTranslations()
  const format = useFormatter()
  const locale = useLocale()
  const currency = locale === "ar" ? "SAR" : "USD"

  return (
    <div className="w-full max-w-lg space-y-10 ">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
          SHARKMKT
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl md:leading-tight">
          {t("left-layout-title")}
        </h1>
      </div>

      {/* Investor Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-200/50 transition-all hover:border-[#C9A227]/20 hover:shadow-lg hover:shadow-slate-200/60">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A227]/30 bg-slate-50 text-[#C9A227]">
            <TrendingUp className="h-7 w-7" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">{t("investor")}</h2>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
            {t("investor-1")}
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
            {t("investor-2")}
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
            {t("investor-3")}
          </li>
        </ul>
      </div>

      {/* Seller Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-200/50 transition-all hover:border-[#C9A227]/20 hover:shadow-lg hover:shadow-slate-200/60">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A227]/30 bg-slate-50 text-[#C9A227]">
            <Store className="h-7 w-7" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">{t("seller")}</h2>
        </div>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
            {t("seller-1")}
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
            {t("seller-2")}
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
            {t("seller-3")}
          </li>
        </ul>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200/80">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold tabular-nums text-slate-800">
              {format.number(2810)}
            </p>
            <p className="text-xs text-slate-500">{t("sales-overall")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200/80">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold tabular-nums text-slate-800">2,555</p>
            <p className="text-xs text-slate-500">{t("sales-sold")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200/80">
            <User className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold tabular-nums text-slate-800">210</p>
            <p className="text-xs text-slate-500">{t("current-listing")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
