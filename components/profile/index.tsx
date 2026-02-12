"use client"

import type { User } from "@/context/user"
import { ProfileHeader } from "./profile-header"
import { ProfileBasicInfo } from "./profile-basic-info"
import { ProfileOnboarding } from "./profile-onboarding"
import { ProfileBusiness } from "./profile-business"

type ProfileViewProps = {
  user: User
}

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <ProfileHeader user={user} />
      <div className="space-y-6">
        <ProfileBasicInfo user={user} />
        <ProfileOnboarding user={user} />
        <ProfileBusiness user={user} />
      </div>
    </div>
  )
}
