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
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-xl font-semibold">{t("why-shark-market")}</h3>
        <p className="text-xs text-slate-500 mt-2">{t("why-shark-market-desc")}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Card key={f.id} className="p-4 shadow-md">
              <CardHeader className="p-0">
                <CardTitle className="text-sm font-semibold">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-1 -mt-5">
                <p className="text-xs text-slate-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Link href="#" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-full text-sm">
            {t("start-now")}
          </Link>
        </div>
      </div>
    </section>
  );
};

