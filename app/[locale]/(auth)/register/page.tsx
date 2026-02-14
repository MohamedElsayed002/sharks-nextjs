"use client";

import useRegister from "@/hooks/use-register";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import Link from "next/link";



const Register = () => {
  const { mutate, isLoading, error } = useRegister();

  const t = useTranslations()

  const formSchema = z.object({
    name: z.string().min(2, t("nameMin")),
    phone: z.string().min(10, t("phoneMin")),
    location: z.string().min(2, t("locationMin")),
    email: z.string().email(t("emailInvalid")),
    password: z.string().min(8, t("passwordMin")),
    gender: z.enum(["Male", "Female"], { message: t("genderRequired") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      phone: "",
      location: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  const inputClass = "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400"

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            {t("create-your-account")}
          </h1>
          <p className="text-sm text-slate-600">{t("register-description")}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">{t("full-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("full-name-placeholder")} className={inputClass} autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-800">{t("phone-number")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("phone-number-placeholder")} type="tel" autoComplete="tel" className={`rtl:text-right ${inputClass}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-800">{t("location")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("location-placeholder")} autoComplete="address-level2" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">{t("gender")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">{t("male")}</SelectItem>
                      <SelectItem value="Female">{t("female")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">{t("email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" autoComplete="email" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">{t("password")}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" autoComplete="new-password" className={inputClass} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-sm text-red-500">
                {error instanceof Error ? error.message : "Something went wrong. Please try again."}
              </p>
            )}

            <Button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#C9A227] font-semibold text-white hover:bg-[#B8921F]"
              disabled={isLoading}
            >
              {isLoading ? t("creating-account") : t("create-account")}
            </Button>
          </form>
        </Form>

        <div className="-mt-1 mt-6 text-center text-sm text-slate-600">
          <p>
            {t("already-account")}{" "}
            <Link className="font-medium text-[#C9A227] hover:text-[#B8921F] hover:underline" href="login">
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};

export default Register;


