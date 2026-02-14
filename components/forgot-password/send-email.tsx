"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


export const SendEmail = ({setStep, setEmail}: {setStep: Dispatch<SetStateAction<number>>, setEmail: Dispatch<SetStateAction<string>>}) => {

    const t = useTranslations()


    const { mutate, isPending} = useMutation({
        mutationFn: (email: string) => forgotPassword(email)
    })

    const formSchema = z.object({
        email: z.string().email(t("emailInvalid"))
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutate(data.email,{
            onSuccess: () => {
                setEmail(data.email)
                setStep(2)
                toast.success("Verification code sent to your email")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">{t("forgot-password")}</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-800">{t("email")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="name@gmail.com"
                                        autoComplete="email"
                                        className="border-slate-200 bg-white text-slate-800 placeholder:text-slate-400"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-[#C9A227] font-semibold text-white hover:bg-[#B8921F]"
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : t("send-email")}
                    </Button>
                </form>
            </Form>
        </div>
    )
}