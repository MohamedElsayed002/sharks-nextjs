"use client"

import Link from "next/link"
import { Headphones, Lightbulb, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export const NeedHelp = () => {
  const locale = useLocale()
  const t = useTranslations("needHelp")

  return (
    <section className="bg-[#F9F8F4] border-t py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-800">{t("title")}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <Headphones className="h-7 w-7" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">{t("supportTitle")}</h3>
              <p className="text-sm text-slate-600">{t("supportDesc")}</p>
              <Link
                href={`/${locale}/help-center`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A227] hover:text-[#B8921F] hover:underline"
              >
                {t("helpCenterLink")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <Lightbulb className="h-7 w-7" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">{t("guideTitle")}</h3>
              <p className="text-sm text-slate-600">{t("guideDesc")}</p>
              <Link
                href={`/${locale}/learn-more`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C9A227] hover:text-[#B8921F] hover:underline"
              >
                {t("learnMoreLink")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
