"use client"

import { LoginAction } from "@/actions/login"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuthStore } from "@/context/user"

export default function useLogin() {
    const setToken = useAuthStore((state) => state.setToken)

    const { mutate, error, isPending } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            const result: LoginResponse = await LoginAction({ email, password })

            if ("access_token" in result) {
                return result as LoginSuccessful
            }
            throw new Error(result.message)
        },
        onSuccess: async (data) => {
            setToken(data.access_token)
            try {
                await fetch("/api/auth/set-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: data.access_token }),
                })
            } catch {
                // Store still has token; cookie may be missing until next login
            }
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