"use client"

import Link from "next/link"
  import { Headphones, Lightbulb, ArrowRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export const NeedHelp = () => {
  const locale = useLocale()
  const t = useTranslations("needHelp")

  return (
    <section className="mx-auto my-20 max-w-7xl px-4">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground">{t("title")}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600">
            <Headphones className="h-7 w-7" aria-hidden />
          </div>
          <div className="min-w-0 space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {t("supportTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("supportDesc")}
            </p>
            <Link
              href={`/${locale}/help-center`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
            >
              {t("helpCenterLink")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="shrink-0 rounded-xl bg-amber-50 p-3 text-amber-600">
            <Lightbulb className="h-7 w-7" aria-hidden />
          </div>
          <div className="min-w-0 space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {t("guideTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("guideDesc")}
            </p>
            <Link
              href={`/${locale}/learn-more`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
            >
              {t("learnMoreLink")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
