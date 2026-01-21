"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction } from "react";


export const SendEmail = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {

    const t = useTranslations()

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
        console.log(data)
        setStep(2)
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
                >
                    {t("send-email")}
                </Button>
            </form>
        </Form>
    )
}