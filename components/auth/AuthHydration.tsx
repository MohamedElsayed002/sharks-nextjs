"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/context/user"
import { getMe } from "@/actions/auth"

async function clearTokenAndUser() {
  useAuthStore.getState().clearUser()
  try {
    await fetch("/api/auth/clear-token", { method: "POST" })
  } catch {
    // ignore
  }
}

export function AuthHydration() {
  const { setUser, setHydrated } = useAuthStore()

  useEffect(() => {
    const rehydrate = async () => {
      await useAuthStore.persist.rehydrate()

      const state = useAuthStore.getState()
      const token = state.accessToken

      if (token) {
        try {
          const data = await getMe(token)
          if (data && data._id) {
            setUser(data)
          } else {
            await clearTokenAndUser()
          }
        } catch {
          await clearTokenAndUser()
        }
      }

      setHydrated()
    }

    rehydrate()
  }, [setUser, setHydrated])

  return null
}
