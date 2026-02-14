"use client"

import { UploadDropzone } from "@/utils/uploadthing"
import { UseFormReturn } from "react-hook-form"
import { FormSchema } from "."
import { Form, FormControl, FormLabel, FormMessage, FormItem, FormDescription, FormField } from "../ui/form"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { X, Plus, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface FinancialInfoProps {
  form: UseFormReturn<FormSchema>
}

export const FinancialInfo = ({ form }: FinancialInfoProps) => {
  const t = useTranslations("addService")
  const [incomeSourceInput, setIncomeSourceInput] = useState("")

  const watchRevenue = form.watch("averageMonthlyRevenue")
  const watchExpenses = form.watch("averageMonthlyExpenses")
  const incomeSources = form.watch("incomeSources") || []
  const revenueProofs = form.watch("revenueProofs") || []

  useEffect(() => {
    const revenue = Number(watchRevenue) || 0
    const expenses = Number(watchExpenses) || 0
    const netProfit = revenue - expenses
    form.setValue("netProfit", netProfit >= 0 ? netProfit : 0)
    form.setValue("isProfitable", netProfit > 0)
  }, [watchRevenue, watchExpenses, form])

  const addIncomeSource = () => {
    if (incomeSourceInput.trim()) {
      const currentSources = form.getValues("incomeSources") || []
      form.setValue("incomeSources", [...currentSources, incomeSourceInput.trim()])
      setIncomeSourceInput("")
    }
  }

  const removeIncomeSource = (index: number) => {
    const currentSources = form.getValues("incomeSources") || []
    form.setValue("incomeSources", currentSources.filter((_, i) => i !== index))
  }

  const removeRevenueProof = (index: number) => {
    const next = revenueProofs.filter((_, i) => i !== index)
    form.setValue("revenueProofs", next)
  }

  return (
    <Form {...form}>
      <div className="space-y-6 text-slate-800">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="averageMonthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">{t("monthlyRevenue")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder={t("monthlyRevenuePlaceholder")}
                    className="border-slate-200 focus-visible:ring-[#C9A227]"
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-sm text-slate-600">{t("monthlyRevenueDesc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="averageMonthlyExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">{t("monthlyExpenses")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder={t("monthlyExpensesPlaceholder")}
                    className="border-slate-200 focus-visible:ring-[#C9A227]"
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-sm text-slate-600">{t("monthlyExpensesDesc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="netProfit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800">{t("netProfit")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type="number" disabled value={field.value} className="border-slate-200 bg-slate-50" />
                  <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm">
                    {field.value > 0 ? (
                      <>
                        <Badge className="border-emerald-500/30 bg-emerald-500/20 text-emerald-600" />
                        <span className="text-emerald-600">{t("profitable")}</span>
                      </>
                    ) : field.value === 0 ? (
                      <>
                        <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-600" />
                        <span className="text-amber-600">{t("breakEven")}</span>
                      </>
                    ) : (
                      <>
                        <Badge className="border-red-500/30 bg-red-500/20 text-red-600" />
                        <span className="text-red-600">{t("loss")}</span>
                      </>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription className="text-sm text-slate-600">
                Revenue − Expenses = {field.value.toFixed(2)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="incomeSources"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800">{t("incomeSources")}</FormLabel>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={t("incomeSourcesPlaceholder")}
                    value={incomeSourceInput}
                    onChange={(e) => setIncomeSourceInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIncomeSource())}
                    className="border-slate-200 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                  />
                  <Button type="button" onClick={addIncomeSource} className="bg-[#C9A227] hover:bg-[#B8921F]">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {incomeSources.length > 0 && (
                  <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                    {incomeSources.map((source, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="border-slate-200 bg-white pr-1 text-sm text-slate-700"
                      >
                        {source}
                        <button
                          type="button"
                          onClick={() => removeIncomeSource(index)}
                          className="ml-2 rounded-full p-0.5 transition-colors hover:bg-slate-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <FormDescription className="text-sm text-slate-600">{t("incomeSourcesDesc")}</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revenueProofs"
          render={() => (
            <FormItem>
              <FormLabel className="text-slate-800">{t("revenueProof")}</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-colors hover:bg-slate-100/50">
                    <UploadDropzone
                      endpoint="revenueProof"
                      onClientUploadComplete={(res) => {
                        if (res?.length) {
                          const newProofs = res.map((f) => ({
                            fileUrl: f.url,
                            fileId: f.key,
                            fileType: f.type || "application/octet-stream",
                            source: "uploadthing",
                          }))
                          form.setValue("revenueProofs", [...revenueProofs, ...newProofs])
                        }
                      }}
                      onUploadError={(error: Error) => toast.error(error.message)}
                      appearance={{
                        container: "min-h-[100px] border-none bg-transparent",
                        uploadIcon: "text-slate-500",
                        label: "text-slate-600 hover:text-slate-700",
                        allowedContent: "text-xs text-slate-500",
                        button: "bg-[#C9A227] text-white ut-ready:bg-[#B8921F]",
                      }}
                      config={{ mode: "auto" }}
                    />
                  </div>
                  {revenueProofs.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {revenueProofs.map((proof, index) => (
                        <li
                          key={proof.fileId}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <FileText className="size-4 shrink-0 text-slate-500" />
                            <div className="min-w-0">
                              <a
                                href={proof.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-sm font-medium text-[#C9A227] hover:underline"
                              >
                                {proof.fileUrl.split("/").pop() || t("documentN", { n: index + 1 })}
                              </a>
                              <p className="text-xs text-slate-500">{proof.fileType}</p>
                            </div>
                            <Badge className="shrink-0 border-emerald-500/30 bg-emerald-500/20 text-emerald-600">
                              {t("uploaded")}
                            </Badge>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRevenueProof(index)}
                            className="shrink-0 rounded p-1 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label="Remove file"
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-sm text-slate-600">{t("revenueProofDesc")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
