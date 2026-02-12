"use client"

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export const HeroCTA = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-slate-100/80">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="rounded-2xl border-slate-200/80 shadow-xl overflow-hidden bg-white">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 md:p-10">
            <div className="text-center sm:text-left">
              <h4 className="text-xl font-bold text-slate-900 md:text-2xl">{t("hero-cta-title")}</h4>
              <p className="mt-2 text-sm text-slate-600 max-w-md">{t("hero-cta-desc")}</p>
            </div>
            <div className="shrink-0">
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium shadow-lg transition hover:bg-slate-800 hover:shadow-xl"
              >
                {t("hero-cta-button")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};