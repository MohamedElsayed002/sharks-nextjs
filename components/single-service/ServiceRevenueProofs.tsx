"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, FileImage } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/context/user"
import { Button } from "../ui/button"

interface RevenueProof {
  fileUrl: string
  fileId: string
  fileType: string
  source: string
  _id: string
}

interface ServiceRevenueProofsProps {
  revenueProofs?: RevenueProof[]
}

function isImageUrl(url: string): boolean {
  if (url.startsWith("blob:")) return true
  const lower = url.toLowerCase()
  return (
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".webp") ||
    lower.endsWith(".gif")
  )
}

function isImageMime(type: string): boolean {
  return type?.startsWith("image/") ?? false
}

export function ServiceRevenueProofs({
  revenueProofs,
}: ServiceRevenueProofsProps) {

  const user = useAuthStore((state) => state.user)
  const locale = useLocale()
  const t = useTranslations("singleService")
  if (!revenueProofs?.length) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Revenue Proof</h3>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
          {revenueProofs.map((proof) => {
            const showAsImage =
              isImageUrl(proof.fileUrl) || isImageMime(proof.fileType)
            const isLocked = !user
            return (
              <div
                key={proof.fileId ?? proof._id}
                className="group relative overflow-hidden rounded-lg border bg-muted"
              >
                {/* Blurred content when not logged in */}
                <div
                  className={cn(
                    "relative aspect-video transition-[filter]",
                    isLocked && "pointer-events-none select-none blur-md"
                  )}
                >
                  {showAsImage ? (
                    <a
                      href={isLocked ? undefined : proof.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-video"
                      aria-hidden={isLocked}
                    >
                      <Image
                        src={proof.fileUrl}
                        alt="Revenue proof"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw, 33vw"
                        unoptimized={proof.fileUrl.startsWith("blob:")}
                      />
                    </a>
                  ) : (
                    <a
                      href={isLocked ? undefined : proof.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex aspect-video flex-col items-center justify-center gap-2 p-4 hover:bg-muted/80"
                      aria-hidden={isLocked}
                    >
                      <FileImage className="size-12 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {t("view-proof-document")}
                      </span>
                    </a>
                  )}
                </div>
                {/* Overlay: login to view (only when not logged in) */}
                {isLocked && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg bg-background/80 backdrop-blur-sm">
                    <Eye className="size-10 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("login-to-view-proof")}
                    </p>
                    <Button variant="default" size="sm" asChild>
                      <Link href={`/${locale}/login`}>
                        {t("login-to-view")}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
