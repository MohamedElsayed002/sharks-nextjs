"use client"

import { useAuthStore } from "@/context/user"
import Link from "next/link"
import { useLocale } from "next-intl"
import { ProfileView } from "@/components/profile"

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const locale = useLocale()

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="mt-2 text-muted-foreground">You need to sign in to view your profile.</p>
        <Link
          href={`/${locale}/login`}
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="sr-only">Your profile</h1>
      <ProfileView user={user} />
    </div>
  )
}
