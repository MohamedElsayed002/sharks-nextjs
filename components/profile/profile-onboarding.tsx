import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/context/user"
import { ProfileField } from "./profile-field"

type ProfileOnboardingProps = {
  user: User
}

export function ProfileOnboarding({ user }: ProfileOnboardingProps) {
  const completed = user.onboardingCompleted === true
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Account & onboarding</CardTitle>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            completed ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
          }`}
        >
          {completed ? "Completed" : "Not completed"}
        </span>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <ProfileField
          label="Account type"
          value={user.accountType ?? undefined}
        />
        <ProfileField label="First name" value={user.firstName} />
        <ProfileField label="Last name" value={user.lastName} />
        <ProfileField label="Country" value={user.country} />
      </CardContent>
    </Card>
  )
}
