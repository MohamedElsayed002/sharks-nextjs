import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/context/user"
import { ProfileField } from "./profile-field"

type ProfileBusinessProps = {
  user: User
}

const hasAnyBusiness = (user: User) =>
  [user.companyName, user.businessUrl, user.category, user.annualRevenue, user.annualProfit, user.businessesCount, user.partnerDescription, user.howHeard].some(
    (v) => v != null && String(v).trim() !== ""
  )

export function ProfileBusiness({ user }: ProfileBusinessProps) {
  if (!hasAnyBusiness(user)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business & partner</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No business or partner details added yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business & partner</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <ProfileField label="Company name" value={user.companyName} />
        <ProfileField label="Business URL" value={user.businessUrl} />
        <ProfileField label="Category" value={user.category} />
        <ProfileField label="Annual revenue" value={user.annualRevenue} />
        <ProfileField label="Annual profit" value={user.annualProfit} />
        <ProfileField label="Businesses count" value={user.businessesCount} />
        <ProfileField label="How you heard about us" value={user.howHeard} />
        {user.partnerDescription && (
          <div className="sm:col-span-2">
            <ProfileField label="Partner description" value={user.partnerDescription} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
