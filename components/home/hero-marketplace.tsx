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

/**
 * Hero background image gallery – pick one by setting ACTIVE_HERO_INDEX below.
 * All from Unsplash (free to use). Add w=1920&q=80 for size/quality.
 */
const HERO_IMAGES = [
  // —— DARK (white text, dark overlay) ——
  {
    id: "dark-finance",
    label: "Dark – Finance / charts",
    url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80",
    style: "dark",
  },
  {
    id: "dark-city-night",
    label: "Dark – City night",
    url: "https://images.unsplash.com/photo-1514565131-fce118ed4b6c?w=1920&q=80",
    style: "dark",
  },
  {
    id: "dark-abstract-blue",
    label: "Dark – Abstract blue/purple",
    url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80",
    style: "dark",
  },
  {
    id: "dark-tech-grid",
    label: "Dark – Tech / digital grid",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    style: "dark",
  },
  {
    id: "dark-gradient-mesh",
    label: "Dark – Gradient mesh",
    url: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=1920&q=80",
    style: "dark",
  },
  {
    id: "dark-minimal",
    label: "Dark – Minimal geometric",
    url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80",
    style: "dark",
  },
  // —— LIGHT (use dark text + lighter overlay or no overlay) ——
  {
    id: "light-workspace",
    label: "Light – Workspace / desk",
    url: "https://images.unsplash.com/photo-1497366216548-ee701fe68564?w=1920&q=80",
    style: "light",
  },
  {
    id: "light-office",
    label: "Light – Office / team",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
    style: "light",
  },
  {
    id: "light-soft-gradient",
    label: "Light – Soft gradient",
    url: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80",
    style: "light",
  },
  {
    id: "light-clean-desk",
    label: "Light – Clean desk",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
    style: "light",
  },
  {
    id: "light-blur-shapes",
    label: "Light – Blur shapes",
    url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80",
    style: "light",
  },
  // —— MIXED / VIBRANT ——
  {
    id: "mixed-geometric",
    label: "Mixed – Geometric / iridescent",
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc25c?w=1920&q=80",
    style: "mixed",
  },
  {
    id: "mixed-aurora",
    label: "Mixed – Aurora / waves",
    url: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=1920&q=80",
    style: "mixed",
  },
  {
    id: "dark-concrete",
    label: "Dark – Concrete / brutalist",
    url: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80",
    style: "dark",
  },
] as const

/** Pick the active hero: set index 0–13 (see HERO_IMAGES labels above). */
const ACTIVE_HERO_INDEX = 3
const HERO_IMAGE = HERO_IMAGES[ACTIVE_HERO_INDEX].url
// 3

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
    <section className="relative flex min-h-screen  flex-col items-center justify-center overflow-hidden px-4 pt-56 pb-5 text-center -mt-20">
      {/* Background image – full bleed (extends behind header) */}
      <div className="absolute  inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for readability and premium feel */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
          aria-hidden
        />
      </div>

      {/* Content – overlaid on top of background */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
        {/* Headline – white, high contrast */}
        <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-5xl ltr:md:text-6xl rtl:md:text-7xl">
          <span className="block">{t("headline1")}</span>
          <span className="block">{t("headline2")}</span>
        </h1>

        {/* Subline – light grey for hierarchy */}
        <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
          <span className="block">{t("subline1")}</span>
          <span className="block">{t("subline2")}</span>
        </p>

        {/* Search bar – semi-transparent bar over hero */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 w-full max-w-xl"
        >
          <div className="flex overflow-hidden rounded-xl bg-white/10 shadow-xl backdrop-blur-md ring-1 ring-white/20">
            <Input
              placeholder={tCommon("search-placeholder")}
              {...register("query")}
              className="h-14 border-0 bg-transparent px-5 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              className="h-14 rounded-none bg-white px-6 text-slate-900 hover:bg-white/95"
            >
              {tCommon("search")}
            </Button>
          </div>
        </form>

        {/* CTA buttons – white and outline for contrast */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="min-w-[200px] rounded-xl bg-white px-8 py-6 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-white/95 hover:shadow-xl"
          >
            <Link href={`/${locale}/browse-listing`}>{t("cta")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] rounded-xl border-2 border-white/80 bg-transparent px-8 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:border-white"
          >
            <Link href={`/${locale}/find-partner`}>{t("cta-partner")}</Link>
          </Button>
        </div>
      </div>

      {/* Platform logos – bottom strip, subtle on dark */}
      <div className="relative z-10 mt-auto w-full max-w-5xl border-t border-white/20 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-10 gap-y-6">
          {PLATFORM_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="flex h-20 w-28 items-center justify-center opacity-60 grayscale transition-opacity hover:opacity-90"
            >
              <Image
                src={logo.src}
                alt={t(logo.altKey)}
                className="max-h-full w-full object-contain invert"
                width={112}
                height={80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
