"use client"

import { useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  XIcon,
  WhatsappIcon,
} from "react-share"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Share2, Link2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareListingProps {
  shareUrl: string
  title: string
  description?: string
  className?: string
}

const iconSize = 24
const btnBase =
  "flex cursor-pointer items-center gap-2 rounded-xl border-0 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"

export function ShareListing({
  shareUrl,
  title,
  description = "",
  className,
}: ShareListingProps) {
  const t = useTranslations("singleService")
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = useCallback(async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { }
  }, [shareUrl])

  const displayUrl =
    shareUrl.length > 42 ? `...${shareUrl.slice(-39)}` : shareUrl

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full gap-2", className)}
          size="default"
          disabled={!shareUrl}
        >
          <Share2 className="size-4" />
          {t("share")}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md rounded-2xl p-6"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {open ? (
          <>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">{t("share")}</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1 text-sm">
                {t("share-subtitle")}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className={cn(
                  btnBase,
                  "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/50"
                )}
              >
                <Link2 className="size-5 shrink-0" />
                <span>{t("share-direct")}</span>
              </button>

              <FacebookShareButton
                url={shareUrl}
                hashtag="#SharkMarket"
                beforeOnClick={() => setOpen(false)}
                className={cn(
                  btnBase,
                  "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/50"
                )}
              >
                <FacebookIcon size={iconSize} round />
                <span>{t("share-facebook")}</span>
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={title}
                beforeOnClick={() => setOpen(false)}
                className={cn(
                  btnBase,
                  "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/50"
                )}
              >
                <XIcon size={iconSize} round />
                <span>{t("share-twitter")}</span>
              </TwitterShareButton>

              <LinkedinShareButton
                url={shareUrl}
                title={title}
                summary={description}
                beforeOnClick={() => setOpen(false)}
                className={cn(
                  btnBase,
                  "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:hover:bg-blue-900/50"
                )}
              >
                <LinkedinIcon size={iconSize} round />
                <span>{t("share-linkedin")}</span>
              </LinkedinShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=" "
                beforeOnClick={() => setOpen(false)}
                className={cn(
                  btnBase,
                  "col-span-2 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-200 dark:hover:bg-green-900/50"
                )}
              >
                <WhatsappIcon size={iconSize} round />
                <span>{t("share-whatsapp")}</span>
              </WhatsappShareButton>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
              <span
                className="min-w-0 flex-1 truncate text-sm text-muted-foreground"
                title={shareUrl}
              >
                {displayUrl}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={handleCopyLink}
                disabled={!shareUrl}
                aria-label={t("copy-link")}
              >
                {copied ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
