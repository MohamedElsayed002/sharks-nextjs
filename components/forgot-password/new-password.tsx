'use client'

import { Dispatch, SetStateAction } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


export const NewPassword = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {


    const t = useTranslations()

    const newPasswordSchema = z
        .object({
            newPassword: z
                .string()
                .trim()
                .min(8, { message: t("password-must-be-at-least-8-characters-long") }) // Ensure a strong password
                .regex(/[A-Z]/, { message: t("password-must-contain-at-least-one-uppercase-letter") })
                .regex(/[a-z]/, { message: t("password-must-contain-at-least-one-lowercase-letter") })
                .regex(/[0-9]/, { message: t("password-must-contain-at-least-one-number") })
                .regex(/[@$!%*?&]/, {
                    message: t("password-must-contain-at-least-one-special-character-and")
                }),

            rePassword: z.string().trim()
        })
        .refine((data) => data.newPassword === data.rePassword, {
            message: t("passwords-do-not-match"),
            path: ["rePassword"] // Attach error to rePassword field
        });



    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            newPassword: '',
            rePassword: ''
        }
    })

    const onSubmit = (data: z.infer<typeof newPasswordSchema>) => {
        console.log(data)
        console.log('tmam')
        // setStep(3)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4 text-white">
                <h1 className='text-3xl font-semibold tracking-tight text-white'>{t("reset-password")}</h1>
                <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("new-password")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="*********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='rePassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("new-password-again")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="*********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="bg-blue-500 w-full" type='submit'>
                    {t("submit")}
                </Button>
            </form>
        </Form>
    )
}