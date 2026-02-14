"use client"

import { useTranslations } from "next-intl"
import { Check, ClipboardCheck, MessageCircle, Shield } from "lucide-react"

const COLUMNS = [
  { key: "preserveRights", icon: Shield },
  { key: "directSupport", icon: MessageCircle },
  { key: "verifyData", icon: ClipboardCheck },
] as const

export function WhoWeAre() {
  const t = useTranslations("whoWeAre")

  return (
    <section className="relative border-t overflow-hidden bg-[#F9F8F4] py-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-slate-600 md:text-lg">
          {t("intro")}
        </p>

        <div className="my-12 flex justify-center" aria-hidden>
          <span className="h-px w-12 bg-slate-300" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {COLUMNS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center"
            >
              <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <Icon className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3 className="text-center text-xl font-bold text-slate-800">
                {t(`${key}-title`)}
              </h3>
              <ul className="mt-5 w-full space-y-3 text-start">
                <li className="flex items-start gap-3 text-slate-600">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  <span className="text-sm leading-relaxed md:text-base">{t(`${key}-1`)}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  <span className="text-sm leading-relaxed md:text-base">{t(`${key}-2`)}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  <span className="text-sm leading-relaxed md:text-base">{t(`${key}-3`)}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
