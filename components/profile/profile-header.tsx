import type { User } from "@/context/user"

type ProfileHeaderProps = {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initial = user.name?.trim().charAt(0)?.toUpperCase() ?? "?"
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
        {initial}
      </div>
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold text-foreground">{user.name}</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        {user.role && (
          <span className="mt-1 inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {user.role}
          </span>
        )}
      </div>
    </div>
  )
}
