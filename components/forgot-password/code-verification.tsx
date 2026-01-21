'use client'

import { Dispatch, SetStateAction } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";


export const CodeVerification = ({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) => {


    const t = useTranslations()

    const codeSchema = z.object({
        code: z.string().min(6, { message: t("minimum-code-is-6-characters") })
    });


    const form = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: ""
        }
    })

    const onSubmit = (data: z.infer<typeof codeSchema>) => {
        console.log(data)
        setStep(3)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="w-96 space-y-4 text-white">
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    {t("code-verification")}
                </h1>
                
                <FormField
                    control={form.control}
                    name="code"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                {t("verify")}
                            </FormLabel>
                            <FormControl>
                                <InputOTP
                                    autoFocus
                                    id='code'
                                    pattern={REGEXP_ONLY_DIGITS}
                                    maxLength={6}
                                    {...field}
                                >
                                    <InputOTPGroup>
                                        {[...Array(6)].map((_,i) => (
                                            <InputOTPSlot key={i} index={i} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className="bg-blue-500" type='submit'>
                    {t("verify")}
                </Button>
            </form>
        </Form>
    )
}