"use client";

import useLogin from "@/hooks/use-login";
import { getMe } from "@/actions/auth";
import { useAuthStore } from "@/context/user";
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
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/routing";



const LoginPage = () => {
  const { mutate, isLoading, error } = useLogin();
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations()

  const formSchema = z.object({
    email: z.string().email(t("emailInvalid")),
    password: z.string().min(8, t("passwordMin")),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setUser = useAuthStore((state) => state.setUser)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: async (loginData) => {
        const user = await getMe(loginData.access_token)
        if (user?._id) {
          setUser(user)

          // Ensure cookie is set before redirect so middleware sees the user
          try {
            await fetch("/api/auth/set-token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: loginData.access_token }),
            })
          } catch {}

          // next-intl router expects path without locale prefix
          if (!user.onboardingCompleted) {
            router.replace("/user/onboarding")
          } else {
            router.replace("/")
          }
        }
      },
    })
  }


  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-lg shadow-slate-200/50 transition-shadow hover:shadow-xl sm:p-10">
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">SHARKMKT</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">{t("welcome-back")}</h1>
          <p className="text-sm text-slate-600">{t("sign-in-description")}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus-visible:ring-[#C9A227]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-sm text-red-500">
                {error instanceof Error ? error.message : "Invalid credentials. Please try again."}
              </p>
            )}

            <Button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#C9A227] py-6 font-semibold text-white shadow-md shadow-[#C9A227]/25 hover:bg-[#B8921F] hover:shadow-lg hover:shadow-[#B8921F]/30"
              disabled={isLoading}
            >
              {isLoading ? t("logging") : t("login")}
            </Button>
          </form>
        </Form>

        <div className="mt-8 space-y-1 border-t border-slate-100 pt-6 text-center text-sm text-slate-600">
          <p>
            {t("no-account")}{" "}
            <Link className="font-medium text-[#C9A227] hover:text-[#B8921F] hover:underline" href="register">
              {t("register")}
            </Link>
          </p>
          <Link className="font-medium text-[#C9A227] hover:text-[#B8921F] hover:underline" href="forgot-password">
            {t("forgot-password")}
          </Link>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;