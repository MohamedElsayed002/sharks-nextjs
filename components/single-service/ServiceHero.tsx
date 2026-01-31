"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface ServiceHeroProps {
  title: string
  category: string
  imageUrl?: string
  verificationLevel?: string
}

export function ServiceHero({
  title,
  category,
  imageUrl,
  verificationLevel,
}: ServiceHeroProps) {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
            <span className="text-6xl font-light text-muted-foreground/50">—</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-white/90 text-black hover:bg-white/90 dark:bg-slate-900/90 dark:text-white"
              >
                {category}
              </Badge>
              {verificationLevel && (
                <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-600 text-white border-0">
                  <CheckCircle2 className="size-3.5" />
                  {verificationLevel}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-md sm:text-3xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
