"use client";

import "react-phone-number-input/style.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PhoneInput from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useAuthStore } from "@/context/user";
import { useMutation } from "@tanstack/react-query";
import { onBoardingCreate } from "@/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

/* ---------------- SCHEMA ---------------- */

const onboardingSchema = z.object({
  accountType: z.enum(["buyer", "seller", "find_partner"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),

  phone: z.string().min(1, "Phone number is required"),

  agree: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms",
  }),

  partnerDescription: z.string().max(2000).optional(),

  optional: z
    .object({
      companyName: z.string().optional(),
      howHeard: z.string().optional(),
      businessUrl: z
        .string()
        .optional()
        .refine((v) => !v || /^https?:\/\//.test(v), {
          message: "Invalid URL (include http:// or https://)",
        }),
      category: z.string().optional(),
      annualRevenue: z.string().optional(),
      annualProfit: z.string().optional(),
      businessesCount: z.string().optional(),
    })
    .optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

/* ---------------- COMPONENT ---------------- */

export default function OnboardingForm() {
  const [showOptional, setShowOptional] = useState(false);
  const user = useAuthStore((state) => state.user);
  const router = useRouter()
  const locale = useLocale();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: OnboardingFormValues) => onBoardingCreate(data)
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
        toast.success("Onboarding successful")
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
    <div className="md:mt-10 w-full md:max-w-7xl mx-auto  p-6">
      <Card className="shadow-md">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="mb-4">
                {/* <div className="text-sm text-muted-foreground">Step 1 of 3</div>  */}
                <h2 className="text-2xl font-semibold">Let’s get you set up</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself to personalize your experience.</p>
              </div>
              {/* ACCOUNT TYPE */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => form.setValue("accountType", "buyer")}
                  className={`flex-1 min-w-[100px] rounded-md py-2 border ${accountTypeChecked === "buyer"
                    ? "bg-white text-black border-black"
                    : "bg-transparent text-muted-foreground"
                    }`}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => form.setValue("accountType", "seller")}
                  className={`flex-1 min-w-[100px] rounded-md py-2 border ${accountTypeChecked === "seller"
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-muted-foreground"
                    }`}
                >
                  Seller
                </button>
                <button
                  type="button"
                  onClick={() => form.setValue("accountType", "find_partner")}
                  className={`flex-1 min-w-[100px] rounded-md py-2 border ${accountTypeChecked === "find_partner"
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-muted-foreground"
                    }`}
                >
                  Find a partner
                </button>
              </div>

              {/* MAIN INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Mohamed" {...field} />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Elsayed" {...field} />
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
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Riyadh, Saudi Arabia" {...field} />
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
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          international
                          defaultCountry="SA"
                          placeholder="Enter phone number"
                          value={field.value}
                          onChange={field.onChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* FIND A PARTNER: description */}
              {showPartnerDescription && (
                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">What kind of partner are you looking for?</h3>
                  <p className="text-sm text-muted-foreground">
                    Describe your project or the type of partner you want to work with.
                  </p>
                  <FormField
                    control={form.control}
                    name="partnerDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="e.g. I'm looking for a technical co-founder for a SaaS in the HR space..."
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
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Optional</h3>
                      <p className="text-sm text-muted-foreground">
                        Add extra details to improve your experience.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setShowOptional((s) => !s)}
                    >
                      {showOptional ? "Hide" : "Add"}
                    </Button>
                  </div>

                  {showOptional && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="optional.companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Aramco" {...field} />
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
                            <FormLabel>How did you hear about us?</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="text-black w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="friend">Friend</SelectItem>
                                  <SelectItem value="google">Google</SelectItem>
                                  <SelectItem value="ad">Advertisement</SelectItem>
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
                            <FormLabel>Business Category</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="text-black w-full">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                                  <SelectItem value="services">Services</SelectItem>
                                  <SelectItem value="saas">SaaS</SelectItem>
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
                            <FormLabel>Annual Revenue</FormLabel>
                            <FormControl>
                              <Input placeholder="120,000 SAR" {...field} />
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
                            <FormLabel>Annual Profit</FormLabel>
                            <FormControl>
                              <Input placeholder="500,000 SAR" {...field} />
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
                            <FormLabel>How many businesses do you own?</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2" {...field} />
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
                    <div className="text-sm leading-tight">
                      <FormLabel className="font-normal">
                        I agree to the{" "}
                        <div className="inline-block">
                          <Link href={`/${locale}/terms`} className="underline">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href={`/${locale}/privacy`} className="underline">
                            Privacy Policy
                          </Link>
                        </div>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
