type ProfileFieldProps = {
  label: string
  value: string | null | undefined
}

export function ProfileField({ label, value }: ProfileFieldProps) {
  const display = value != null && String(value).trim() !== "" ? String(value).trim() : "—"
  return (
    <div className="grid gap-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{display}</span>
    </div>
  )
}
