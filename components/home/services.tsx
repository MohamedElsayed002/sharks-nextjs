"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import type { Product } from "@/types"



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
  const title = detail?.title?.length > 50 ? detail?.title?.slice(0, 50) + "..." : detail?.title
  const description = detail?.description ?? ""
  const excerpt = description.length > 120 ? description.slice(0, 120).trim() + "…" : description

  return (
    <article className="relative">
      {/* Image or gradient header */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-xl shadow-inner">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="h-full w-full"
          />
        )}
      </div>

      <Card className="-mt-8 rounded-b-xl rounded-tl-none overflow-visible">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <span className="rounded-full border px-3 mt-4 py-1 text-xs text-slate-600">
              {product.category || "—"}
            </span>
          </div>
          <CardTitle className="mt-3 line-clamp-2 text-base font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 line-clamp-2 text-sm text-slate-600">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-slate-500">
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

  return (
    <section className="my-14 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <h2 className="text-2xl font-semibold">{t("service-title")}</h2>
            <p className="text-sm text-slate-500">{t("service-description")}</p>
          </div>
          <div>
            <Link
              href={`/${locale}/browse-listing`}
              className="mt-0 inline-block rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow md:mt-5"
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ServiceCard
                key={product._id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
