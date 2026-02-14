"use client"

import { getUserType } from "@/actions"
import { FindPartner } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { FindPartnerEmptyState } from "./empty-state"
import { FindPartnerSkeleton } from "./find-partner-skeleton"
import { PartnerCard } from "./partner-card"

export const FindPartnerComponent = () => {
  const t = useTranslations()
  const { data: partners = [], isLoading } = useQuery<FindPartner[]>({
    queryKey: ["find-partner"],
    queryFn: () => getUserType("find_partner"),
  })

  if (isLoading) {
    return <FindPartnerSkeleton />
  }


  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t("find-partner")}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl">
          {t("find-partner-subtitle")}
        </p>
      </header>

      {partners.length === 0 ? (
        <FindPartnerEmptyState />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner._id}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
