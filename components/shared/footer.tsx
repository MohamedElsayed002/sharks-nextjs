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
    <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold">
                S
              </div>
              <span className="font-semibold text-white">SharkMarket</span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <FooterColumn title={t("quickLinks")} links={quickLinks} />
          <FooterColumn title={t("resources")} links={resources} />
          <FooterColumn title={t("legal")} links={legal} />
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-slate-400">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm hover:text-white transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
