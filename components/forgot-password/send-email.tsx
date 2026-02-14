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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-white">{t("forgot-password")}</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">{t("email")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="name@gmail.com"
                                    autoComplete="email"
                                    className='text-white'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    className="w-full mt-2 bg-blue-500"
                    disabled={isPending}
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("send-email")}
                </Button>
            </form>
        </Form>
    )
}