"use client"

import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

type ProjectCard = {
  id: string
  titleKey: string
  subtitleKey: string
  imageSrc: string
  imageAltKey: string
}

const SALES_HISTORY_CARDS: ProjectCard[] = [
  {
    id: "optimum-dream",
    titleKey: "card-optimum-title",
    subtitleKey: "card-optimum-subtitle",
    imageSrc: "/perfume.jpg",
    imageAltKey: "card-optimum-alt",
  },
  {
    id: "arctic-store",
    titleKey: "card-arctic-title",
    subtitleKey: "card-arctic-subtitle",
    imageSrc: "/image.png",
    imageAltKey: "card-arctic-alt",
  },
  
]

const PROFITABLE_CARDS: ProjectCard[] = [
  {
    id: "laflor",
    titleKey: "card-laflor-title",
    subtitleKey: "card-laflor-subtitle",
    imageSrc: "/wild-flora.webp",
    imageAltKey: "card-laflor-alt",
  },
  {
    id: "sportswear",
    titleKey: "card-sportswear-title",
    subtitleKey: "card-sportswear-subtitle",
    imageSrc: "/sports-wear.webp",
    imageAltKey: "card-sportswear-alt",
  },
]

function ProjectCardItem({
  card,
  viewAllKey,
  locale,
  t,
  isHighlighted,
}: {
  card: ProjectCard
  viewAllKey: string
  locale: string
  t: (key: string) => string
  isHighlighted?: boolean
}) {
  return (
    <Link
      href={`/${locale}/browse-listing`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:shadow-lg sm:flex-row sm:items-stretch",
        isHighlighted && "ring-2 ring-neutral-900 ring-offset-2"
      )}
    >
      {/* Left: title + subtitle */}
      <div className="flex flex-1 flex-col justify-center gap-1 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-[#374151] group-hover:text-neutral-900 sm:text-xl">
          {t(card.titleKey)}
        </h3>
        <p className="text-sm text-[#6b7280]">{t(card.subtitleKey)}</p>
      </div>

      {/* Right: thumbnail + overlay + icons */}
      <div className="relative shrink-0 sm:w-[180px]">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 sm:aspect-square">
          <Image
            src={card.imageSrc}
            alt={t(card.imageAltKey)}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 180px"
            unoptimized
          />
          {/* View All badge */}
          <span className="absolute end-2 top-2 rounded bg-neutral-900 px-2 py-1 text-xs font-medium text-white">
            {t(viewAllKey)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function FeaturedProjects() {
  const t = useTranslations("featuredProjects")
  const locale = useLocale()

  return (
    <section className="bg-[#f8fcf8] px-4 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-10">
        {/* Left: Projects with distinctive sales history */}
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-bold text-black sm:text-3xl lg:text-start">
            {t("sales-history-heading")}
          </h2>
          <div className="flex flex-col gap-4">
            {SALES_HISTORY_CARDS.map((card) => (
              <ProjectCardItem
                key={card.id}
                card={card}
                viewAllKey="view-all"
                locale={locale}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Right: The most profitable projects */}
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-bold text-black sm:text-3xl lg:text-start">
            {t("profitable-heading")}
            <span className="border-b-2 border-neutral-900">
              {t("profitable-heading-underline")}
            </span>
            {t("profitable-heading-suffix")}
          </h2>
          <div className="flex flex-col gap-4">
            {PROFITABLE_CARDS.map((card, i) => (
              <ProjectCardItem
                key={card.id}
                card={card}
                viewAllKey="view-all"
                locale={locale}
                t={t}
                isHighlighted={i === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
