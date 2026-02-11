"use client"

import { useTranslations } from "next-intl"
import type { SellCategory } from "./categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const YEARS = Array.from({ length: 21 }, (_, i) => 2026 - i)
const COUNTRIES = ["Egypt", "Saudi Arabia", "UAE", "Jordan", "Kuwait", "Bahrain", "Oman", "Qatar"]
const INDUSTRIES = ["E-commerce", "SaaS", "Content", "Education", "Health", "Finance", "Other"]
const SITE_TYPES = ["Website", "Mobile App", "Marketplace", "Blog", "Directory", "Other"]
const CURRENCIES = ["USD $", "EUR €", "GBP £", "SAR", "EGP","AED","QAR","KWD","BHD"]

const formSchema = z.object({
  businessName: z.string().min(1),
  startDateMonth: z.string(),
  startDateYear: z.string(),
  businessLocation: z.string(),
  industry: z.string(),
  siteType: z.string(),
  currency: z.string(),
  annualRevenue: z.string(),
})

export type TellUsFormValues = z.infer<typeof formSchema>

interface TellUsStepProps {
  category: SellCategory
  onBack?: () => void
  onContinue?: (data: TellUsFormValues) => void
}

export function TellUsStep({ category, onBack, onContinue }: TellUsStepProps) {
  const t = useTranslations("sell")
  const tf = useTranslations("sell.form")

  const form = useForm<TellUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      startDateMonth: "Jan",
      startDateYear: "2026",
      businessLocation: "Egypt",
      industry: "",
      siteType: "",
      currency: "USD $",
      annualRevenue: "0",
    },
  })

  const onSubmit = (values: TellUsFormValues) => {
    onContinue?.(values)
  }

  return (
    <div className="mx-auto my-10 max-w-2xl px-4">
      <h2 className="text-center text-xl font-bold">{t("tell-us-heading")}</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        {t("tell-us-description")}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("business-name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={tf("business-name-placeholder")}
                    className="rounded-md border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>{tf("operations-date")}</FormLabel>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="startDateMonth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full rounded-md border text-black">
                          <SelectValue placeholder={tf("month-placeholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MONTHS.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDateYear"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full rounded-md border text-black">
                          <SelectValue placeholder={tf("year-placeholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YEARS.map((y) => (
                          <SelectItem key={y} value={String(y)}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="businessLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("location")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border text-black">
                      <SelectValue placeholder={tf("location-placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("industry")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border text-black">
                      <SelectValue placeholder={tf("industry-placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRIES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tf("site-type")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border text-black">
                      <SelectValue placeholder={tf("site-type-placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SITE_TYPES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>{tf("annual-revenue")}</FormLabel>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-[120px] shrink-0">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full rounded-md border text-black">
                          <SelectValue placeholder={tf("currency-placeholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem className="min-w-0 flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={tf("revenue-placeholder")}
                        className="rounded-md border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            {onBack ? (
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground hover:bg-transparent hover:underline"
                onClick={onBack}
              >
                &lt; {tf("back")}
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {tf("continue")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
