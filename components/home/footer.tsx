"use client";

import Link from "next/link";

const footerLinks = {
  quickLinks: [
    { label: "Browse Listings", href: "#" },
    { label: "Sell Your Business", href: "#" },
    { label: "How It Works", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Buyer Guide", href: "#" },
    { label: "Seller Guide", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Escrow Services", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold">
                S
              </div>
              <span className="font-semibold text-white">SharkMarket</span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              A specialized platform for buying, selling, and investing in digital projects across the Middle East.
            </p>
          </div>

          {/* Columns */}
          <FooterColumn title="Quick Links" links={footerLinks.quickLinks} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Shark Market. All rights reserved.
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
