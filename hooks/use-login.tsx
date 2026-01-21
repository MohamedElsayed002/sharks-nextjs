"use client"

import { LoginAction } from "@/actions/login"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useLogin() {

    const {mutate, error, isPending} = useMutation({
        mutationFn: async ({email,password}: {email: string,password: string}) => {
            const result: LoginResponse  = await LoginAction({email,password})

            if("access_token" in result) {
                return result as LoginSuccessful
            }
            throw new Error(result.message)
        },
        onSuccess: (data) => {
            localStorage.setItem("access_token",data.access_token)
            toast.success("Login successful")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        mutate,
        isLoading: isPending,
        error
    }
}