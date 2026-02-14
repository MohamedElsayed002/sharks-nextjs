"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

  const quickLinks = [
    { label: t("browseListings"), href: `/${locale}/browse-listing` },
    { label: t("sellYourBusiness"), href: `/${locale}/add-service` },
    { label: t("howItWorks"), href: `/${locale}/learn-more` },
    { label: t("pricing"), href: `/${locale}/pricing` },
  ];
  const resources = [
    { label: t("blog"), href: `/${locale}/blog` },
    { label: t("helpCenter"), href: `/${locale}/help-center` },
    { label: t("buyerGuide"), href: "#" },
    { label: t("sellerGuide"), href: "#" },
  ];
  const legal = [
    { label: t("privacyPolicy"), href: "#" },
    { label: t("termsOfService"), href: "#" },
    { label: t("escrowServices"), href: "#" },
    { label: t("contactUs"), href: "#" },
  ];

  return (
    <footer className="bg-[#F9F8F4] border-t text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227] font-bold text-white">
                S
              </div>
              <span className="font-semibold text-slate-800">SharkMarket</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          <FooterColumn title={t("quickLinks")} links={quickLinks} />
          <FooterColumn title={t("resources")} links={resources} />
          <FooterColumn title={t("legal")} links={legal} />
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-slate-800">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-600 transition hover:text-[#B8921F]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
