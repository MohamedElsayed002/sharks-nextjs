"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export const NeedHelp = () => {
  const locale = useLocale()
  const t = useTranslations("needHelp")

  return (
    <div className="mx-auto my-20 max-w-7xl space-y-3">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-sm text-gray-500">{t("description")}</p>
      <div className="mt-8 flex flex-wrap gap-10">
        <div className="flex gap-6">
          <Phone className="h-8 w-8 shrink-0 rounded-full border border-blue-500 p-1 text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold">{t("supportTitle")}</h2>
            <p className="text-sm text-gray-500">{t("supportDesc")}</p>
            <Link
              href={`/${locale}/help-center`}
              className="text-sm text-blue-500 underline hover:text-blue-600"
            >
              {t("helpCenterLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}