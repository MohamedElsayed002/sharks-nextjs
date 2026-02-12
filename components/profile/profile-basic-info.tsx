import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/context/user"
import { ProfileField } from "./profile-field"

type ProfileBasicInfoProps = {
  user: User
}

function formatDate(iso: string | undefined) {
  if (!iso) return "—"
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      dateStyle: "medium",
    })
  } catch {
    return iso
  }
}

export function ProfileBasicInfo({ user }: ProfileBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <ProfileField label="Full name" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Phone" value={user.phone} />
        <ProfileField label="Location" value={user.location} />
        <ProfileField label="Gender" value={user.gender} />
        <ProfileField label="Role" value={user.role} />
        <ProfileField label="Member since" value={formatDate(user.createdAt)} />
        <ProfileField label="Last updated" value={formatDate(user.updatedAt)} />
      </CardContent>
    </Card>
  )
}
