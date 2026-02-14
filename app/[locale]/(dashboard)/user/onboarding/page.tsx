"use client"

import "react-phone-number-input/style.css"
import React, { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import PhoneInput from "react-phone-number-input"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useLocale } from "next-intl"
import { useAuthStore } from "@/context/user"
import { useMutation } from "@tanstack/react-query"
import { onBoardingCreate } from "@/actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

function getOnboardingSchema(t: (key: string) => string) {
  return z.object({
    accountType: z.enum(["buyer", "seller", "find_partner"]),
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    country: z.string().min(1, t("countryRequired")),
    phone: z.string().min(1, t("phoneRequired")),
    agree: z.boolean().refine((v) => v === true, { message: t("agreeRequired") }),
    partnerDescription: z.string().max(2000).optional(),
    optional: z
      .object({
        companyName: z.string().optional(),
        howHeard: z.string().optional(),
        businessUrl: z
          .string()
          .optional()
          .refine((v) => !v || /^https?:\/\//.test(v), { message: t("invalidUrl") }),
        category: z.string().optional(),
        annualRevenue: z.string().optional(),
        annualProfit: z.string().optional(),
        businessesCount: z.string().optional(),
      })
      .optional(),
  })
}

export type OnboardingFormValues = z.infer<ReturnType<typeof getOnboardingSchema>>;

/* ---------------- COMPONENT ---------------- */

export default function OnboardingForm() {
  const t = useTranslations("onboarding")
  const [showOptional, setShowOptional] = useState(false)
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const locale = useLocale()

  const onboardingSchema = useMemo(() => getOnboardingSchema(t), [t])

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OnboardingFormValues) => onBoardingCreate(data),
  })

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      accountType: "buyer",
      firstName: user?.name || "",
      lastName: "",
      country: user?.location || "",
      phone: "",
      agree: false,
      partnerDescription: "",
      optional: {
        companyName: "",
        annualProfit: "",
        annualRevenue: "",
        businessesCount: "",
        businessUrl: "",
        category: "",
        howHeard: "",
      },
    },
  });

  const accountTypeChecked = form.watch("accountType");
  const isSeller = accountTypeChecked === "seller";
  const isFindPartner = accountTypeChecked === "find_partner";
  const isBuyer = accountTypeChecked === "buyer";
  const showOptionalSection = isSeller || isBuyer;
  const showPartnerDescription = isFindPartner;

  useEffect(() => {
    if (isSeller) setShowOptional(true);
    else if (isBuyer) setShowOptional(false);
    else if (isFindPartner) setShowOptional(false);
  }, [isSeller, isBuyer, isFindPartner]);

  const onSubmit = (data: OnboardingFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(t("success"))
        setTimeout(() => {
          router.replace("/")
        }, 2000)
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : String(err)
        toast.error(message)
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] py-10 md:py-16">
      <div className="mx-auto w-full max-w-2xl px-4">
        <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6 md:p-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 [&_input]:border-slate-200 [&_input]:focus-visible:ring-[#C9A227] [&_label]:text-slate-800 [&_textarea]:border-slate-200 [&_textarea]:focus-visible:ring-[#C9A227]"
              >
                <div className="mb-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">SHARKMKT</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">{t("title")}</h2>
                  <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => form.setValue("accountType", "buyer")}
                    className={cn(
                      "min-w-[100px] flex-1 rounded-xl border-2 py-2.5 font-medium transition-colors",
                      accountTypeChecked === "buyer"
                        ? "border-[#C9A227] bg-[#C9A227] text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {t("buyer")}
                  </button>
                  <button
                    type="button"
                    onClick={() => form.setValue("accountType", "seller")}
                    className={cn(
                      "min-w-[100px] flex-1 rounded-xl border-2 py-2.5 font-medium transition-colors",
                      accountTypeChecked === "seller"
                        ? "border-[#C9A227] bg-[#C9A227] text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {t("seller")}
                  </button>
                  <button
                    type="button"
                    onClick={() => form.setValue("accountType", "find_partner")}
                    className={cn(
                      "min-w-[100px] flex-1 rounded-xl border-2 py-2.5 font-medium transition-colors",
                      accountTypeChecked === "find_partner"
                        ? "border-[#C9A227] bg-[#C9A227] text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {t("findPartner")}
                  </button>
                </div>

              {/* MAIN INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("firstName")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("firstNamePlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("lastName")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("lastNamePlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("country")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("countryPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phone")}</FormLabel>
                      <FormControl>
                        <PhoneInput
                          international
                          defaultCountry="SA"
                          placeholder={t("phonePlaceholder")}
                          value={field.value}
                          onChange={field.onChange}
                          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-[#C9A227] focus-within:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* FIND A PARTNER: description */}
              {showPartnerDescription && (
                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <h3 className="font-semibold text-slate-800">{t("partnerHeading")}</h3>
                  <p className="text-sm text-slate-600">{t("partnerSubtitle")}</p>
                  <FormField
                    control={form.control}
                    name="partnerDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={t("partnerPlaceholder")}
                            className="min-h-[120px] resize-y"
                            maxLength={2000}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* OPTIONAL - only for Buyer & Seller */}
              {showOptionalSection && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{t("optional")}</h3>
                      <p className="text-sm text-slate-600">{t("optionalSubtitle")}</p>
                    </div>
                    <Button
                      variant="ghost"
                      type="button"
                      className="text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                      onClick={() => setShowOptional((s) => !s)}
                    >
                      {showOptional ? t("hide") : t("add")}
                    </Button>
                  </div>

                  {showOptional && (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="optional.companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("companyName")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("companyNamePlaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="optional.howHeard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("howHeard")}</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full border-slate-200 text-slate-800 focus:ring-[#C9A227]">
                                  <SelectValue placeholder={t("select")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="friend">{t("howHeardFriend")}</SelectItem>
                                  <SelectItem value="google">{t("howHeardGoogle")}</SelectItem>
                                  <SelectItem value="ad">{t("howHeardAd")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="optional.category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("businessCategory")}</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full border-slate-200 text-slate-800 focus:ring-[#C9A227]">
                                  <SelectValue placeholder={t("select")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ecommerce">{t("categoryEcommerce")}</SelectItem>
                                  <SelectItem value="services">{t("categoryServices")}</SelectItem>
                                  <SelectItem value="saas">{t("categorySaas")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="optional.annualRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("annualRevenue")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("annualRevenuePlaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="optional.annualProfit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("annualProfit")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("annualProfitPlaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="optional.businessesCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("businessesCount")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("businessesCountPlaceholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* AGREE */}
              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="text-sm leading-tight text-slate-600">
                      <FormLabel className="font-normal text-slate-600">
                        {t("agreeTerms")}{" "}
                        <Link href={`/${locale}/terms`} className="text-[#C9A227] underline hover:text-[#B8921F]">
                          {t("termsAndConditions")}
                        </Link>{" "}
                        {t("and")}{" "}
                        <Link href={`/${locale}/privacy`} className="text-[#C9A227] underline hover:text-[#B8921F]">
                          {t("privacyPolicy")}
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                type="submit"
                className="w-full rounded-xl bg-[#C9A227] font-medium text-white hover:bg-[#B8921F]"
              >
                {isPending ? <Loader2 className="size-4 animate-spin" /> : t("save")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
