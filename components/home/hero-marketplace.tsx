"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const PLATFORM_LOGOS = [
  { src: "/woocomerce.webp", altKey: "logo-woocommerce" },
  { src: "/wordpress.webp", altKey: "logo-wordpress" },
  { src: "/shopify.png", altKey: "logo-shopify" },
  { src: "/logo-matjer.png", altKey: "logo-matajer" },
  { src: "/salla-logo.png", altKey: "logo-salla" }
] as const

export function HeroMarketplace() {
  const t = useTranslations("heroMarketplace")
  const locale = useLocale()

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-4 py-20 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
        {/* Headline - two lines, bold black */}
        <h1 className="text-4xl font-extrabold leading-tight text-black sm:text-5xl ltr:md:text-7xl rtl:md:text-8xl">
          <span className="block">{t("headline1")}</span>
          <span className="block">{t("headline2")}</span>
        </h1>

        {/* Sub-headline - two lines, grey */}
        <p className="max-w-2xl text-lg text-[#666] sm:text-xl">
          <span className="block">{t("subline1")}</span>
          <span className="block">{t("subline2")}</span>
        </p>

        {/* CTA button - dark gradient */}
        <Button
          asChild
          size="lg"
          className="min-w-[220px] rounded-lg bg-gradient-to-b from-[#333] to-[#111] px-8 py-6 text-base font-medium text-white shadow-md transition-opacity hover:opacity-95"
        >
          <Link href={`/${locale}/browse-listing`}>{t("cta")}</Link>
        </Button>
      </div>

      {/* Platform logos row - bottom, monochrome grey */}
      <div className="mt-36 flex w-full max-w-5xl flex-wrap items-center justify-center gap-10 gap-y-8 border-t border-gray-200 pt-16">
        {PLATFORM_LOGOS.map((logo, i) => (
          <div
            key={i}
            className="flex w-32 h-32 items-center justify-center grayscale opacity-70 transition-opacity hover:opacity-100"
          >
            <Image
              src={logo.src}
              alt={t(logo.altKey)}
              className=" max-w-full object-contain"
              width={200}
              height={200}

            />
          </div>
        ))}
      </div>
    </section>
  )
}
