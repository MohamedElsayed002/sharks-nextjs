"use client"

import { useTranslations } from "next-intl";
import React from "react";

type TrustItem = {
  id: string;
  title: string;
  subtitle?: string;
};



export const TrustProtection = () => {


  const t = useTranslations()

  const TRUST_ITEMS: TrustItem[] = [
  { id: "t1", title: t("secure-payments") },
  { id: "t2", title: t("kyc-verification") },
  { id: "t3", title: t("escrow-protection")},
  { id: "t4", title: t("verified-listing") },
];

  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-lg font-semibold">{t("trust-prot")}</h3>
        <p className="text-xs text-slate-300 mt-2">{t("trust-prot-desc")}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {TRUST_ITEMS.map((it) => (
            <div key={it.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                {/* placeholder icon - you can replace with lucide-react or icons */}
                <span className="text-xs">🔒</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{it.title}</div>
                {it.subtitle && <div className="text-xs text-slate-300">{it.subtitle}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



