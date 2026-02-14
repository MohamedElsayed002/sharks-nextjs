"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const searchSchema = z.object({
  query: z.string().min(0),
})

type SearchForm = z.infer<typeof searchSchema>

const PLATFORM_LOGOS = [
  { src: "/woocomerce.webp", altKey: "logo-woocommerce" },
  { src: "/wordpress.webp", altKey: "logo-wordpress" },
  { src: "/shopify.png", altKey: "logo-shopify" },
  { src: "/logo-matjer.png", altKey: "logo-matajer" },
  { src: "/salla-logo.png", altKey: "logo-salla" }
] as const



/** Light hero: globe-style background with white overlay (faint, professional). */
const HERO_GLOBE =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80"

export function HeroMarketplace() {
  const t = useTranslations("heroMarketplace")
  const tCommon = useTranslations()
  const locale = useLocale()

  const { register, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  })

  const onSubmit = (data: SearchForm) => {
    const params = new URLSearchParams()
    if ((data.query ?? "").trim()) params.set("search", (data.query ?? "").trim())
    const queryString = params.toString()
    window.location.href = `/${locale}/browse-listing${queryString ? `?${queryString}` : ""}`
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-56 pb-5 text-center -mt-20 bg-[#F9F8F4]">
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_GLOBE}
          alt="Image"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-white/75"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A227]">
          SHARKMKT
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-slate-800 drop-shadow-none sm:text-5xl ltr:md:text-6xl rtl:md:text-7xl">
          <span className="block">{t("headline1")}</span>
          <span className="block">{t("headline2")}</span>
        </h1>

        {/* Subline – muted gray */}
        <p className="max-w-2xl text-lg text-slate-600 sm:text-xl">
          <span className="block">{t("subline1")}</span>
          <span className="block">{t("subline2")}</span>
        </p>

        {/* Search bar – white card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 w-full max-w-xl"
        >
          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <Input
              placeholder={tCommon("search-placeholder")}
              {...register("query")}
              className="h-14 border-0 bg-transparent px-5 text-slate-800 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              className="h-14 rounded-none bg-[#C9A227] px-6 text-white hover:bg-[#B8921F]"
            >
              {tCommon("search")}
            </Button>
          </div>
        </form>

        {/* CTA buttons – gold primary, white outline */}
        <div className="flex flex-wrap items-center justify-center gap-4 -mt-4 mb-4">
          <Button
            asChild
            size="lg"
            className="min-w-[200px] rounded-xl bg-[#C9A227] px-8 py-6 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#B8921F] hover:shadow-xl"
          >
            <Link href={`/${locale}/browse-listing`}>{t("cta")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] rounded-xl border-2 border-slate-300 bg-white px-8 py-6 text-base font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-400"
          >
            <Link href={`/${locale}/find-partner`}>{t("cta-partner")}</Link>
          </Button>
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full max-w-5xl border-t border-slate-200 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-10 gap-y-6">
          {PLATFORM_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="flex h-28 w-28 shrink-0 items-center justify-center opacity-50 transition-opacity hover:opacity-80"
            >
              <Image
                src={logo.src}
                alt={t(logo.altKey)}
                className="h-full w-full object-contain"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
