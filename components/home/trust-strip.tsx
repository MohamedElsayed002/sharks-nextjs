"use client"

import { useTranslations } from "next-intl"
import { ShieldCheck, Handshake, MapPin } from "lucide-react"

const ITEMS = [
  { key: "trust-strip-1", icon: ShieldCheck },
  { key: "trust-strip-2", icon: Handshake },
  { key: "trust-strip-3", icon: MapPin },
] as const

export function TrustStrip() {
  const t = useTranslations()

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/80 py-5">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
        {ITEMS.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            <Icon className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
            <span>{t(key)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
