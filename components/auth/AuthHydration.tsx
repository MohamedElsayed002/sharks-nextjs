"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/context/user"
import { getMe } from "@/actions/auth"

export function AuthHydration() {
  const { setUser, setHydrated } = useAuthStore()

  useEffect(() => {
    const rehydrate = async () => {
      await useAuthStore.persist.rehydrate()

      const state = useAuthStore.getState()
      const token = state.accessToken

      if (token && !state.user) {
        try {
          const data = await getMe(token)
          if (data && data._id) {
            setUser(data)
          } else {
            useAuthStore.getState().clearUser()
          }
        } catch {
          useAuthStore.getState().clearUser()
        }
      }

      setHydrated()
    }

    rehydrate()
  }, [setUser, setHydrated])

  return null
}
