"use client"

import { useEffect } from "react"
import { useRouter } from "@/i18n/routing"
import { useAuthStore } from "@/context/user"


export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const hydrated = useAuthStore((state) => state.hydrated)

  useEffect(() => {
    if (!hydrated) return
    if (user) router.replace("/")
  }, [hydrated, user, router])

  return <>{children}</>
}
