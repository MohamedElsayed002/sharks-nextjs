"use client"

import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import type { Product } from "@/actions"

interface ListingCardProps {
  product: Product
  title: string
  description: string
}

export function ListingCard({ product, title, description }: ListingCardProps) {
  const locale = useLocale()
  const t = useTranslations("browseListing")

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/10] w-full bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <span className="text-4xl text-muted-foreground/50 font-light">—</span>
          </div>
        )}
        <Badge
          className="absolute top-2 right-2 bg-emerald-600 hover:bg-emerald-600 text-white border-0 gap-1"
          variant="secondary"
        >
          <CheckCircle2 className="size-3.5" />
          {t("verified")}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {product.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-base line-clamp-2 leading-tight">{title}</h3>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        {product.averageMonthlyRevenue != null && (
          <p className="text-sm text-muted-foreground mt-2">
            {t("revenue")}: €{product.averageMonthlyRevenue.toLocaleString()}/mo
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-2 border-t">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link href={`/${locale}/browse-listing/${product._id}`}>{t("view-details")}</Link>
        </Button>
        {/* <Button variant="default" size="sm" className="flex-1" asChild>
          <Link href={`/${locale}/browse-listing/${product._id}#contact`}>{t("contact-seller")}</Link>
        </Button> */}
      </CardFooter>
    </Card>
  )
}
