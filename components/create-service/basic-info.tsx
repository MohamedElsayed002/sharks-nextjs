"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchema } from "./index"
import { Form, FormControl, FormLabel, FormField, FormMessage, FormItem, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Languages } from "lucide-react"
import { useTranslations } from "next-intl"

interface Step1Props {
  form: UseFormReturn<FormSchema>
}

export const BasicInfo = ({ form }: Step1Props) => {
  const t = useTranslations("addService")

  return (
    <Form {...form}>
      <div className="space-y-6 text-slate-800">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-slate-800">{t("categoryLabel")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={t("categoryPlaceholder")}
                  className="border-slate-200 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                />
              </FormControl>
              <FormDescription className="text-sm text-slate-600">{t("categoryDescription")}</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="flex items-center gap-2 text-slate-600">
            <Languages className="h-5 w-5" />
            <span className="text-lg font-medium text-slate-800">{t("bilingualDetails")}</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <p className="-mt-4 mb-6 text-center text-sm text-slate-600">{t("provideBoth")}</p>

        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 space-y-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <span className="text-sm font-bold">EN</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t("englishDetails")}</h3>
          </div>

          <FormField
            control={form.control}
            name="details.0.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">{t("titleEnglish")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t("titleEnglishPlaceholder")}
                    className="border-slate-200 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.0.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">{t("descriptionEnglish")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder={t("descriptionEnglishPlaceholder")}
                    className="resize-none border-slate-200 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 space-y-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <span className="text-sm font-bold">AR</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{t("arabicDetails")}</h3>
          </div>

          <FormField
            control={form.control}
            name="details.1.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">{t("titleArabic")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={t("titleArabicPlaceholder")}
                    dir="rtl"
                    className="border-slate-200 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.1.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">{t("descriptionArabic")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder={t("descriptionArabicPlaceholder")}
                    dir="rtl"
                    className="resize-none border-slate-200 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  )
}
