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
        if (user?._id) setUser(user)
        router.replace("/")
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-slate-800 bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white">{t("welcome-back")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("sign-in-description")}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-white">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
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
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="text-white"
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
                className="w-full mt-2 bg-blue-500"
                disabled={isLoading}
              >
                {isLoading ? t("logging") : t("login")}
              </Button>
            </form>
          </Form>
          <div className="text-white -mt-2">
            <p>{t("no-account")}<Link className="underline text-blue-500" href="register">{t("register")}</Link></p>
            <Link className="underline text-blue-500" href="forgot-password">{t("forgot-password")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;