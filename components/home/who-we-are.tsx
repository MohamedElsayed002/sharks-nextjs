"use client"

import { useTranslations } from "next-intl"
import { Check, ClipboardCheck, MessageCircle, Shield } from "lucide-react"

const COLUMNS = [
  {
    key: "verifyData",
    icon: ClipboardCheck,
  },
  {
    key: "directSupport",
    icon: MessageCircle,
  },
  {
    key: "preserveRights",
    icon: Shield,
  },
] as const

export function WhoWeAre() {
  const t = useTranslations("whoWeAre")

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-slate-100">
      {/* Optional subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-transparent to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-300 md:text-base">
          {t("intro")}
        </p>

        <div className="my-10 flex justify-center" aria-hidden>
          <span className="text-slate-500">—</span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {COLUMNS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 bg-slate-800/50 text-slate-200">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">
                {t(`${key}-title`)}
              </h3>
              <ul className="mt-4 space-y-3 text-start">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{t(`${key}-1`)}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{t(`${key}-2`)}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{t(`${key}-3`)}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
