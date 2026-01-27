"use client"

import { UploadButton } from "@/utils/uploadthing";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from ".";
import { Form, FormControl, FormLabel, FormMessage, FormItem, FormDescription, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Wallet, X, Plus } from "lucide-react";
import { useEffect, useState } from "react"
import { Button } from "../ui/button";

interface FinancialInfoProps {
  form: UseFormReturn<FormSchema>
}

export const FinancialInfo = ({ form }: FinancialInfoProps) => {

  const [incomeSourceInput, setIncomeSourceInput] = useState("")
  const [revenueProofFile, setRevenueProofFile] = useState<File | null>(null)

  const watchRevenue = form.watch("averageMonthlyExpenses")
  const watchExpenses = form.watch("averageMonthlyRevenue")
  const incomeSources = form.watch("incomeSources") || []

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setRevenueProofFile(file)
      form.setValue("revenueProofs", {
        fileUrl: URL.createObjectURL(file),
        fileId: `file_${Date.now()}`,
        fileType: file.type,
        source: "manual_upload"
      })
    }
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
          name="revenueProofs.fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Revenue Proof</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className='flex items-center justify-center w-full'>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-slate-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">PDF, PNG, JPG or Excel (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {revenueProofFile && (
                    <div className="flex items-center gap-3 p-3 bg-gray-200 border rounded-lg">
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>{revenueProofFile.name}</p>
                        <p className="text-sm font-semibold">{(revenueProofFile.size / 1024 /1024).toFixed(2)} MB</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Uploaded
                      </Badge>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-sm">
                Upload proof revenue (bank statements, invoices, etc.)
              </FormDescription>
            </FormItem>
          )}
        />

      </div>
    </Form>
  )
}
