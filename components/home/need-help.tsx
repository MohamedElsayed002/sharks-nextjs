"use client"

import Link from "next/link"
import { Headphones, Lightbulb } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export const NeedHelp = () => {
  const locale = useLocale()
  const t = useTranslations("needHelp")

  return (
    <section className="mx-auto my-20 max-w-7xl px-4">
      {/* Top: heading + intro */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground">{t("title")}</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Bottom: two blocks side by side */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Contact Customer Support */}
        <div className="flex gap-4">
          <div className="shrink-0 text-blue-600">
            <Headphones className="h-8 w-8" aria-hidden />
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
              className="inline-flex items-center gap-1 text-sm font-normal text-blue-600 hover:underline"
            >
              {t("helpCenterLink")}
              <span aria-hidden>&gt;</span>
            </Link>
          </div>
        </div>

        {/* Read Shark's Customer Guide */}
        <div className="flex gap-4">
          <div className="shrink-0 text-blue-600">
            <Lightbulb className="h-8 w-8" aria-hidden />
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
              className="inline-flex items-center gap-1 text-sm font-normal text-blue-600 hover:underline"
            >
              {t("learnMoreLink")}
              <span aria-hidden>&gt;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
