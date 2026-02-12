"use client"

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Feature = {
  id: string;
  title: string;
  desc: string;
};


export const WhySharkMarket = () => {

  const t = useTranslations()

  const FEATURES: Feature[] = [
    { id: "f1", title: t("f1-title"), desc: t("f1-description") },
    { id: "f2", title:  t("f2-title"), desc: t("f2-description")},
    { id: "f3", title: t("f3-title"), desc: t("f3-description") },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{t("why-shark-market")}</h3>
        <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">{t("why-shark-market-desc")}</p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((f) => (
            <Card key={f.id} className="p-5 shadow-lg border-slate-200/80 bg-white hover:shadow-xl transition-shadow rounded-xl">
              <CardHeader className="p-0">
                <CardTitle className="text-base font-semibold text-slate-900">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-3">
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Link href="#" className="inline-flex items-center rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-medium shadow-md transition hover:bg-slate-800">
            {t("start-now")}
          </Link>
        </div>
      </div>
    </section>
  );
};

