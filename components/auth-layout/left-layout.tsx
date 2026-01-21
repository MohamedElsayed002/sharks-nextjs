"use client"

import {
  TrendingUp,
  Store,
  CheckCircle,
  BarChart3,
  ShoppingCart,
  User
} from "lucide-react"
import { useFormatter, useLocale, useTranslations } from "next-intl"

export const LeftDesign = () => {
  const t = useTranslations()
  const format = useFormatter()
  const locale = useLocale()

  return (
    <div className="w-[700px] rounded-2xl bg-gradient-to-br from-[#0B0F1A] to-[#070A13] p-10 text-white space-y-8 shadow-2xl">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-wide">
        {t("left-layout-title")}
      </h1>

      {/* Investor Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1A1F2B] to-[#131826] p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold">{t("investor")}</h2>
        </div>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            {t("investor-1")}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            {t("investor-2")}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            {t("investor-3")}
          </li>
        </ul>
      </div>

      {/* Seller Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1A1F2B] to-[#131826] p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600/20">
            <Store className="h-5 w-5 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold">{t("seller")}</h2>
        </div>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {t("seller-1")}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {t("seller-2")}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {t("seller-3")}
          </li>
        </ul>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-600/40 to-transparent" />

      {/* Stats */}
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <BarChart3 className="h-6 w-6 text-gray-400" />
          <div>
            <p className="text-2xl font-bold">
                {format.number(13732,{
                    style: 'currency',
                    currency: locale === 'en' ? 'USA' : 'SAR'
                })}
            </p>
            <p className="text-sm text-gray-400">{t("sales-overall")}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ShoppingCart className="h-6 w-6 text-gray-400" />
          <div>
            <p className="text-2xl font-bold">2,555</p>
            <p className="text-sm text-gray-400">{t("sales-sold")}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <User className="h-6 w-6 text-gray-400" />
          <div>
            <p className="text-2xl font-bold">210</p>
            <p className="text-sm text-gray-400">{t("current-listing")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
