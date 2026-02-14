import { FindPartner } from "@/types"

export const DESCRIPTION_MAX_LENGTH = 160

export function displayName(partner: FindPartner): string {
  const first = partner.firstName?.trim()
  const last = partner.lastName?.trim()
  if (first || last) return [first, last].filter(Boolean).join(" ")
  return partner.name?.trim() || "Partner"
}

export function initials(partner: FindPartner): string {
  const name = displayName(partner)
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase() || "?"
}
