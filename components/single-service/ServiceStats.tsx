"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react"

interface ServiceStatsProps {
  averageMonthlyRevenue?: number
  averageMonthlyExpenses?: number
  netProfit?: number
  isProfitable?: boolean
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function ServiceStats({
  averageMonthlyRevenue,
  averageMonthlyExpenses,
  netProfit,
  isProfitable,
}: ServiceStatsProps) {
  const t = useTranslations("singleService")
  const hasAnyStat =
    averageMonthlyRevenue != null ||
    averageMonthlyExpenses != null ||
    netProfit != null

  if (!hasAnyStat) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold">{t("financial-overview")}</h3>
        {isProfitable != null && (
          <Badge
            variant={isProfitable ? "default" : "destructive"}
            className="gap-1"
          >
            {isProfitable ? (
              <>
                <TrendingUp className="size-3.5" />
                {t("profitable")}
              </>
            ) : (
              <>
                <TrendingDown className="size-3.5" />
                {t("not-profitable")}
              </>
            )}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          {averageMonthlyRevenue != null && (
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
                <DollarSign className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {t("monthly-revenue")}
                </p>
                <p className="text-lg font-semibold">
                  ${formatCurrency(averageMonthlyRevenue)}/mo
                </p>
              </div>
            </div>
          )}
          {averageMonthlyExpenses != null && (
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
                <Wallet className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Monthly Expenses
                </p>
                <p className="text-lg font-semibold">
                  ${formatCurrency(averageMonthlyExpenses)}/mo
                </p>
              </div>
            </div>
          )}
          {netProfit != null && (
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                <TrendingUp className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {t("net-profit")}
                </p>
                <p className="text-lg font-semibold">${formatCurrency(netProfit)}/mo</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
