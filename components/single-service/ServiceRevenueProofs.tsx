"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileImage } from "lucide-react"

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
  const t = useTranslations("singleService")
  if (!revenueProofs?.length) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Revenue Proof</h3>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {revenueProofs.map((proof) => {
            const showAsImage =
              isImageUrl(proof.fileUrl) || isImageMime(proof.fileType)
            return (
              <div
                key={proof._id}
                className="group relative overflow-hidden rounded-lg border bg-muted"
              >
                {showAsImage ? (
                  <a
                    href={proof.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-video"
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
                    href={proof.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex aspect-video flex-col items-center justify-center gap-2 p-4 hover:bg-muted/80"
                  >
                    <FileImage className="size-12 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {t("view-proof-document")}
                    </span>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
