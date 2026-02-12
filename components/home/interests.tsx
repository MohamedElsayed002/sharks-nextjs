"use client"

import { Pickaxe, LayoutGrid, Users2 } from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

const CARDS = [
  {
    id: "sell",
    icon: Pickaxe,
    titleKey: "sellCardTitle",
    descKey: "sellCardDesc",
    ctaKey: "sellCardCta",
    href: "add-service",
  },
  {
    id: "browse",
    icon: LayoutGrid,
    titleKey: "browseCardTitle",
    descKey: "browseCardDesc",
    ctaKey: "browseCardCta",
    href: "browse-listing",
  },
  {
    id: "partner",
    icon: Users2,
    titleKey: "partnerCardTitle",
    descKey: "partnerCardDesc",
    ctaKey: "partnerCardCta",
    href: "find-partner",
  },
] as const

export const Interests = () => {
  const t = useTranslations("interests")
  const locale = useLocale()

  return (
    <section className="bg-[#0f1419] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-2xl font-medium tracking-tight text-amber-200/90 sm:text-3xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map(({ id, icon: Icon, titleKey, descKey, ctaKey, href }) => (
            <article
              key={id}
              className="group flex flex-col rounded-2xl border border-slate-600/50 bg-slate-800/40 p-6 shadow-lg backdrop-blur-sm transition hover:border-slate-500/60 hover:bg-slate-800/60 sm:p-8"
            >
              <div className="mb-5 flex justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/80 text-slate-200 transition group-hover:border-amber-400/40 group-hover:text-amber-300/90">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
              </div>
              <h3 className="text-center text-xl font-bold text-slate-100 sm:text-2xl">
                {t(titleKey)}
              </h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-slate-400">
                {t(descKey)}
              </p>
              <div className="mt-6 flex flex-1 flex-col justify-end">
                <Link
                  href={`/${locale}/${href}`}
                  className="flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-slate-900 shadow-md transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  {t(ctaKey)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
