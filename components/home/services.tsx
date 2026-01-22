"use client"

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

interface ServiceItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  gradientFrom: string;
  gradientTo: string;
}

const items: ServiceItem[] = [
  {
    id: "1",
    category: "News",
    title: "Q2 marketplace indicators update",
    excerpt: "Higher valuation multiples for recurring-revenue assets across KSA.",
    date: "July 12, 2025",
    gradientFrom: "#042a40",
    gradientTo: "#0ea5a4",
  },
  {
    id: "2",
    category: "News",
    title: "Fast-track financial verification launches",
    excerpt: "A new path cuts initial review time down to 72 hours.",
    date: "July 8, 2025",
    gradientFrom: "#6b2c00",
    gradientTo: "#0f172a",
  },
  {
    id: "3",
    category: "Growth",
    title: "Pre-sale checklist for sellers",
    excerpt: "Simple steps to prep financials and operations docs.",
    date: "July 6, 2025",
    gradientFrom: "#0f172a",
    gradientTo: "#0284c7",
  },
  {
    id: "5",
    category: "News",
    title: "Small merchants get access to growth loans",
    excerpt: "A pilot scheme opened access to micro-loans for sellers.",
    date: "June 28, 2025",
    gradientFrom: "#123456",
    gradientTo: "#7c3aed",
  },
];

const CardItem: React.FC<{ item: ServiceItem }> = ({ item }) => {


  return (
    <article className="relative">
      {/* gradient header */}
      <div
        className="h-52 w-full rounded-t-xl shadow-inner"
        style={{
          background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
        }}
      >
        {/* small white pill overlay */}
        <div className="absolute left-6 top-36 transform -translate-y-1/2 bg-white/90 rounded-md px-4 py-2 text-sm shadow">
          <span className="block text-slate-700">{item.title.split(" ").slice(0, 3).join(" ")}...</span>
        </div>
      </div>

      {/* actual card that overlaps the header */}
      <Card className="-mt-8 rounded-b-xl rounded-tl-none overflow-visible">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs px-3 py-1 border rounded-full text-slate-600">{item.category}</span>
          </div>
          <CardTitle className="mt-3 text-base font-semibold">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-4">{item.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <time>{item.date}</time>
            <Link href="#" className="text-indigo-600 hover:underline">
              Read more →
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export const Services = () => {

  const t = useTranslations()
  const locale = useLocale()
  return (
    <section className="py-12 my-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-5 justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">{t("service-title")}</h2>
            <p className="text-sm text-slate-500">{t("service-description")}</p>
          </div>
          <div>
            <Link href={`/${locale}/browse-listing`} className="inline-block mt-0 md:mt-5 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow">{t("service-button")}</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it) => (
            <CardItem key={it.id} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
};

