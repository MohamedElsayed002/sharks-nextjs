"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { getSingleServiceUser } from "@/actions"
import { SingleServiceUser } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { ServiceHero } from "./ServiceHero"
import { ServiceStats } from "./ServiceStats"
import { ServiceDescription } from "./ServiceDescription"
import { ServiceIncomeSources } from "./ServiceIncomeSources"
import { ServiceRevenueProofs } from "./ServiceRevenueProofs"
import { SellerCard } from "./SellerCard"

function getDetailForLocale(
  service: SingleServiceUser,
  locale: string
) {
  const lang = locale === "ar" ? "ar" : "en"
  const detail = service.details?.find((d) => d.lang === lang)
  return detail ?? service.details?.[0]
}

export function SingleService({ serviceId }: { serviceId: string }) {
  const locale = useLocale()
  const { data, isLoading, error } = useQuery<SingleServiceUser>({
    queryKey: ["single-service", serviceId],
    queryFn: () => getSingleServiceUser(serviceId),
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="mb-6 aspect-[21/9] w-full rounded-xl" />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "Failed to load listing."}
        </p>
      </div>
    )
  }

  const detail = getDetailForLocale(data, locale)
  const title = detail?.title ?? ""
  const description = detail?.description ?? ""

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ServiceHero
        title={title}
        category={data.category}
        imageUrl={data.imageUrl}
        verificationLevel={data.verificationLevel}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
        <main className="space-y-6">
          <ServiceStats
            averageMonthlyRevenue={data.averageMonthlyRevenue}
            averageMonthlyExpenses={data.averageMonthlyExpenses}
            netProfit={data.netProfit}
            isProfitable={data.isProfitable}
          />
          <ServiceDescription description={description} />
          <ServiceIncomeSources incomeSources={data.incomeSources} />
          <ServiceRevenueProofs revenueProofs={data.revenueProofs} />
        </main>

        <aside>
          {data.owner && typeof data.owner === "object" ? (
            <SellerCard owner={data.owner} serviceId={data._id} />
          ) : null}
        </aside>
      </div>
    </div>
  )
}
