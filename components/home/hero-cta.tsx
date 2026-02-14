"use client"

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export const HeroCTA = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="bg-[#F9F8F4] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="flex flex-col items-center justify-between gap-8 p-8 sm:flex-row md:p-10">
            <div className="text-center sm:text-left">
              <h4 className="text-xl font-bold text-slate-800 md:text-2xl">{t("hero-cta-title")}</h4>
              <p className="mt-2 max-w-md text-sm text-slate-600">{t("hero-cta-desc")}</p>
            </div>
            <div className="shrink-0">
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C9A227] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#B8921F] hover:shadow-xl"
              >
                {t("hero-cta-button")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
};