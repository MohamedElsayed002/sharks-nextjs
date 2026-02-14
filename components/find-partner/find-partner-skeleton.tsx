"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { PartnerCardSkeleton } from "./partner-card-skeleton"

const SKELETON_COUNT = 6

export function FindPartnerSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="space-y-6">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-full max-w-xl" />
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <PartnerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
