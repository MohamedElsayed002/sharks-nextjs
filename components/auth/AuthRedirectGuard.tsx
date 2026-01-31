"use client"

import { useEffect } from "react"
import { useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useAuthStore } from "@/context/user"

/**
 * Wraps auth pages (login, register) and redirects to dashboard if user is already logged in.
 */
export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const locale = useLocale()
  const user = useAuthStore((state) => state.user)
  const hydrated = useAuthStore((state) => state.hydrated)

  useEffect(() => {
    if (!hydrated) return
    if (user) router.replace("/")
  }, [hydrated, user, router])

  return <>{children}</>
}
