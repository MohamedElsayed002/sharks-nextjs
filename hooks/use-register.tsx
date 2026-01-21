"use client"

import { RegisterAction } from "@/actions/register"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"

export default function useRegister() {

    const router = useRouter()
    const locale = useLocale()

  const {mutate, error, isPending} = useMutation({
        mutationFn: async ({email,password,name,location,gender,phone}: {email: string,password: string,name: string,location: string,gender: "Male" | "Female",phone: string}) => {
            const result  = await RegisterAction({email,password,name,location,gender,phone})

            if("statusCode" in result) {
                throw new Error(result.message)
            } 
            return result
        },
        onSuccess: () => {
            router.push(`/${locale}/login`)
            toast.success("Registered Successfully. Login")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return {
        mutate,
        isLoading: isPending,
        error
    }
}