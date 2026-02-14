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
    <section className="bg-[#F9F8F4] border-b py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map(({ id, icon: Icon, titleKey, descKey, ctaKey, href }) => (
            <article
              key={id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8"
            >
              <div className="mb-5 flex justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition group-hover:bg-[#C9A227]/20 group-hover:text-[#B8921F]">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
              </div>
              <h3 className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
                {t(titleKey)}
              </h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
                {t(descKey)}
              </p>
              <div className="mt-6 flex flex-1 flex-col justify-end">
                <Link
                  href={`/${locale}/${href}`}
                  className="flex items-center justify-center rounded-xl bg-[#C9A227] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#B8921F] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
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
