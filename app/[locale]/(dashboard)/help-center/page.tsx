"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SubmitRequestForm } from "@/components/help-center/submit-request-form"

export default function HelpCenterPage() {
  const t = useTranslations("helpCenter")
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {locale === "ar" ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
          {t("backToHome")}
        </Link>

        {/* Page title */}
        <h1 className="mb-10 text-3xl font-bold tracking-tight text-foreground">
          {t("submitRequestTitle")}
        </h1>

        {/* Form container: white card on light background */}
        <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
          <SubmitRequestForm />
        </div>
      </div>
    </div>
  )
}
