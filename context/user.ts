import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type User = {
  _id: string
  name: string
  email: string
  codeExpiresAt: string
  createdAt: string
  gender: string
  location: string
  role: string
  updatedAt: string
}

type AuthStore = {
  user: User | null
  accessToken: string | null
  hydrated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  setAuth: (user: User, token: string) => void
  clearUser: () => void
  setHydrated: () => void
}

const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  length: 0,
  key: () => null,
  clear: () => {},
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ accessToken: token }),
      setAuth: (user, token) => set({ user, accessToken: token }),
      clearUser: () => set({ user: null, accessToken: null }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "shark-auth",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
      skipHydration: true,
    }
  )
)
