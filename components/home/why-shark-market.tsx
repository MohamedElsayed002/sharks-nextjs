"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

type Feature = {
  id: string
  title: string
  desc: string
}

export const WhySharkMarket = () => {
  const t = useTranslations()
  const locale = useLocale()

  const FEATURES: Feature[] = [
    { id: "f1", title: t("f1-title"), desc: t("f1-description") },
    { id: "f2", title: t("f2-title"), desc: t("f2-description") },
    { id: "f3", title: t("f3-title"), desc: t("f3-description") },
  ]

  return (
    <section className="bg-[#F9F8F4] border-t border-b py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
          {t("why-shark-market")}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
          {t("why-shark-market-desc")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {FEATURES.map((f) => (
            <Card
              key={f.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="p-0">
                <CardTitle className="text-base font-semibold text-slate-800">
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-3">
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button
            asChild
            className="rounded-xl bg-[#C9A227] px-6 py-6 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#B8921F] hover:shadow-xl"
          >
            <Link href={`/${locale}/browse-listing`}>{t("start-now")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

