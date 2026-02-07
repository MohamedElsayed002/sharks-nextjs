"use client"

import { useTranslations } from "next-intl"
import { FileText, Shield, Lock, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const TERMS_SECTIONS = [
  "s1", "s2", "s3", "s4", "s5", "s6",
  "s7", "s8", "s9", "s10", "s11", "s12",
] as const

const ESCROW_POINTS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const

/** Renders bullet-list strings (e.g. "• Item 1\n• Item 2") as proper ul/li. Handles leading intro text. */
function BulletList({ text, className }: { text: string; className?: string }) {
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean)
  const bulletStart = lines.findIndex((l) => /^[•\-]\s/.test(l) || l.startsWith("•"))
  const intro = bulletStart >= 0 ? lines.slice(0, bulletStart).join(" ") : null
  const items =
    bulletStart >= 0
      ? lines.slice(bulletStart).map((l) => l.replace(/^[•\-]\s*/, "").trim()).filter(Boolean)
      : lines

  return (
    <div className={cn("space-y-2", className)}>
      {intro && <p className="text-muted-foreground leading-relaxed">{intro}</p>}
      {items.length > 0 ? (
        <ul className="list-inside list-disc space-y-1.5 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

/** Renders content with paragraphs and bullet lists */
function RichContent({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/\n\n+/).filter(Boolean)
  return (
    <div className={cn("space-y-3", className)}>
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (trimmed.includes("•") || /^[•\-]\s/m.test(trimmed)) {
          return <BulletList key={i} text={trimmed} />
        }
        return (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {trimmed}
          </p>
        )
      })}
    </div>
  )
}

const NAV_ITEMS = [
  { id: "terms", icon: FileText },
  { id: "escrow", icon: Shield },
  { id: "privacy", icon: Lock },
] as const

export default function HelpCenterPage() {
  const t = useTranslations("helpCenter")
  const locale = useLocale()

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("subtitle")}
          </p>
          <Link
            href={`/${locale}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {locale === "ar" ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
            {t("backToHome")}
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row lg:gap-12 lg:py-12">
        {/* Sticky Table of Contents */}
        <aside className="shrink-0 lg:sticky lg:top-24 lg:h-fit lg:w-56">
          <nav
            aria-label="Table of contents"
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("onThisPage")}
            </p>
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ id, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    {t(`${id}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 space-y-8">
          {/* Terms of Service */}
          <section id="terms" className="scroll-mt-24">
            <Card>
              <CardHeader className="border-b pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t("terms.title")}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("terms.lastUpdated")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("terms.intro")}
                </p>
                <div className="space-y-6">
                  {TERMS_SECTIONS.map((key) => (
                    <div
                      key={key}
                      className="rounded-lg border bg-muted/30 p-4"
                    >
                      <h3 className="mb-2 font-semibold text-foreground">
                        {t(`terms.${key}Title`)}
                      </h3>
                      <RichContent text={t(`terms.${key}Content`)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Escrow Policy */}
          <section id="escrow" className="scroll-mt-24">
            <Card>
              <CardHeader className="border-b pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t("escrow.title")}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      Escrow
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("escrow.intro")}
                </p>
                <ol className="list-inside list-decimal space-y-3 rounded-lg border bg-muted/30 p-5 pl-8 text-muted-foreground">
                  {ESCROW_POINTS.map((key) => (
                    <li key={key} className="pl-1 leading-relaxed">
                      {t(`escrow.${key}`)}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-24">
            <Card>
              <CardHeader className="border-b pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Lock className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t("privacy.title")}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      Privacy
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("privacy.intro")}
                </p>

                <div className="grid gap-6 sm:grid-cols-1">
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">
                      {t("privacy.dataCollectedTitle")}
                    </h3>
                    <BulletList text={t("privacy.dataCollectedItems")} />
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">
                      {t("privacy.useOfDataTitle")}
                    </h3>
                    <BulletList text={t("privacy.useOfDataItems")} />
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">
                      {t("privacy.dataProtectionTitle")}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("privacy.dataProtectionContent")}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h3 className="mb-3 font-semibold text-foreground">
                      {t("privacy.userRightsTitle")}
                    </h3>
                    <BulletList text={t("privacy.userRightsContent")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
