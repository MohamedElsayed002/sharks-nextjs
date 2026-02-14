"use client"

import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import type { Product } from "@/types"

const CARD_WIDTH = 320
const CARD_IMAGE_HEIGHT = 208
const CARD_TOTAL_HEIGHT = 420

function getDetailForLocale(product: Product, locale: string) {
  const lang = locale === "ar" ? "ar" : "en"
  const detail = product.details?.find((d) => d.lang === lang)
  return detail ?? product.details?.[0]
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return ""
  }
}

interface ServiceCardProps {
  product: Product
  locale: string
}

function ServiceCard({ product, locale }: ServiceCardProps) {
  const t = useTranslations()
  const detail = getDetailForLocale(product, locale)
  const title = detail?.title?.length ? detail.title.slice(0, 50) + (detail.title.length > 50 ? "..." : "") : detail?.title ?? ""
  const description = detail?.description ?? ""
  const excerpt = description.length > 120 ? description.slice(0, 120).trim() + "…" : description

  return (
    <article
      className="relative flex h-full w-full flex-col"
      style={{ height: CARD_TOTAL_HEIGHT, minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH }}
    >
      <div
        className="relative w-full shrink-0 overflow-hidden rounded-t-xl shadow-inner"
        style={{ height: CARD_IMAGE_HEIGHT }}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes={`${CARD_WIDTH}px`}
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      <Card className="-mt-8 flex min-h-0 flex-1 flex-col rounded-b-xl rounded-tl-none overflow-visible">
        <CardHeader className="shrink-0 pb-0">
          <div className="flex items-center justify-between">
            <span className="mt-4 rounded-full border px-3 py-1 text-xs text-slate-600">
              {product.category || "—"}
            </span>
          </div>
          <CardTitle className="mt-3 line-clamp-2 text-base font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 flex flex-col">
          <p className="mb-4 line-clamp-2 shrink-0 text-sm text-slate-600">{excerpt}</p>
          <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
            <time>{formatDate(product.createdAt)}</time>
            <Link
              href={`/${locale}/browse-listing/${product._id}`}
              className="text-indigo-600 hover:underline"
            >
              {t("read-more")} →
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}

interface ServicesProps {
  products: Product[]
  locale: string
}

export const Services = ({ products, locale }: ServicesProps) => {
  const t = useTranslations()
  const slides = products.slice(0, 7)

  const isRtl = locale === "ar"

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    direction: isRtl ? "rtl" : "ltr",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  })

  return (
    <section className="bg-[#F9F8F4] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{t("service-title")}</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">{t("service-description")}</p>
          </div>
          <div>
            <Link
              href={`/${locale}/browse-listing`}
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-slate-800 md:mt-0"
            >
              {t("service-button")}
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center text-sm text-slate-500">
            <p>{t("browseListing.no-listings")}</p>
            <Link
              href={`/${locale}/browse-listing`}
              className="mt-4 inline-block text-indigo-600 hover:underline"
            >
              {t("service-button")}
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden pb-4 pt-2">
            <div
              className="overflow-hidden px-2 md:px-4"
              ref={emblaRef}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div
                className="flex touch-pan-y gap-6 md:gap-8"
                style={{ backfaceVisibility: "hidden" }}
              >
                {slides.map((product) => (
                  <div
                    key={product._id}
                    className="min-w-0 shrink-0"
                    style={{ flex: `0 0 ${CARD_WIDTH}px` }}
                  >
                    <ServiceCard product={product} locale={locale} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
