"use client"

import { RegisterAction } from "@/actions/register"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export default function useRegister() {
  const {mutate, error, isPending} = useMutation({
        mutationFn: async ({email,password,name,location,gender,phone}: {email: string,password: string,name: string,location: string,gender: "Male" | "Female",phone: string}) => {
            const result  = await RegisterAction({email,password,name,location,gender,phone})

            console.log(result)
        },
        onSuccess: (data) => {
            console.log('data',data)
            // toast.success("Login successful")
        },
        onError: (error) => {
            console.log(error)
            // toast.error(error.message)
        }
    })

    return {
        mutate,
        isLoading: isPending,
        error
    }
}