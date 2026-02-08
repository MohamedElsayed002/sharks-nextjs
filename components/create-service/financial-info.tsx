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
import { toast } from "sonner";

interface FinancialInfoProps {
  form: UseFormReturn<FormSchema>
}

export const FinancialInfo = ({ form }: FinancialInfoProps) => {

  const [incomeSourceInput, setIncomeSourceInput] = useState("")

  const watchRevenue = form.watch("averageMonthlyExpenses")
  const watchExpenses = form.watch("averageMonthlyRevenue")
  const incomeSources = form.watch("incomeSources") || []
  const revenueProofs = form.watch("revenueProofs") || []

  // Auto Calculate Net Profit 
  useEffect(() => {
    const revenue = Number(watchRevenue) || 0
    const expenses = Number(watchExpenses) || 0
    const netProfit = revenue - expenses

    form.setValue('netProfit', netProfit >= 0 ? netProfit : 0)
    form.setValue('isProfitable', netProfit > 0)
  }, [watchRevenue, watchExpenses, form])

  const addIncomeSource = () => {
    if (incomeSourceInput.trim()) {
      const currentSources = form.getValues('incomeSources') || []
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
      <div className="space-y-6">

        {/* Revenue and Expenses */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name="averageMonthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Revenue</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="5000"
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-sm">Average Monthly revenue</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="averageMonthlyExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Expenses</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="2000"
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription className="text-sm">Average Monthly expenses</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Net Profit */}
        <FormField
          control={form.control}
          name="netProfit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Net Profit (Auto-calculated)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="number"
                    disabled
                    value={field.value}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm">
                    {field.value > 0 ? (
                      <>
                        <Badge className='bg-green-500/20 text-green-400 border-green-500/30' />
                        <span className="text-green-400">Profitable</span>
                      </>
                    ) : field.value === 0 ? (
                      <>
                        <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/30' />
                        <span className="text-yellow-400">Break Even</span>
                      </>
                    ) : (
                      <>
                        <Badge className='bg-red-500/20 text-red-400 border-red-500/30' />
                        <span className="text-red-400">Loss</span>
                      </>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormDescription className='text-sm'>
                Revenue - Expenses = ${field.value.toFixed(2)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Income Sources */}
        <FormField
          control={form.control}
          name="incomeSources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Sources</FormLabel>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g, Online sales, Youtube, Affiliate Marketing"
                    value={incomeSourceInput}
                    onChange={(e) => setIncomeSourceInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncomeSource())}
                  />
                  <Button type='button' onClick={addIncomeSource}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {incomeSources.length > 0 && (
                  <div className='flex flex-wrap gap-2 p-4 border border-slate-700 rounded-lg'>
                    {incomeSources.map((source, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-300 border-violet-500/30 pr-1 text-sm"
                      >
                        {source}
                        <button
                          type="button"
                          onClick={() => removeIncomeSource(index)}
                          className="ml-2 hover:bg-violet-500/30 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <FormDescription className="text-sm">
                  Add all sources of income for this service
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />


        {/* Revenue Proof Upload */}
        <FormField
          control={form.control}
          name="revenueProofs"
          render={() => (
            <FormItem>
              <FormLabel className="">Revenue Proof</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full rounded-lg border-2 border-dashed border-slate-700  p-6 transition-colors hover:bg-slate-800/50">
                    <UploadDropzone
                      endpoint="revenueProof"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          const newProofs = res.map((f) => ({
                            fileUrl: f.url,
                            fileId: f.key,
                            fileType: f.type || "application/octet-stream",
                            source: "uploadthing",
                          }))
                          form.setValue("revenueProofs", [...revenueProofs, ...newProofs])
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(error.message)
                      }}
                      appearance={{
                        container: "border-none bg-transparent min-h-[100px]",
                        uploadIcon: "text-slate-400",
                        label: "text-slate-400 hover:text-slate-300",
                        allowedContent: "text-slate-500 text-xs",
                        button:
                          "bg-blue-500 text-white ut-ready:from-violet-500 ut-ready:to-cyan-500 ",
                      }}
                      config={{ mode: "auto" }}
                    />
                  </div>

                  {revenueProofs.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {revenueProofs.map((proof, index) => (
                        <li
                          key={proof.fileId}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-white p-3"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <FileText className="size-4 shrink-0 text-slate-400" />
                            <div className="min-w-0">
                              <a
                                href={proof.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-sm font-medium text-blue-400 hover:underline"
                              >
                                {proof.fileUrl.split("/").pop() || `Document ${index + 1}`}
                              </a>
                              <p className="text-xs text-slate-500">{proof.fileType}</p>
                            </div>
                            <Badge className="shrink-0 bg-green-500/20 text-green-400 border-green-500/30">
                              Uploaded
                            </Badge>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRevenueProof(index)}
                            className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-700 hover:text-destructive"
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
              <FormDescription className="text-sm">
                Upload proof of revenue (bank statements, invoices, etc.). At least one file required.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    </Form>
  )
}
