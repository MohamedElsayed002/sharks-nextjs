"use client"

import { useAuthStore } from "@/context/user"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import LocaleToggle from "./toggle-locale"
import { cn } from "@/lib/utils"

export const Navbar = () => {
    const locale = useLocale()
    const t = useTranslations()
    const pathname = usePathname()
    const user = useAuthStore((state) => state)
    const router = useRouter()

    const links = [
        { id: 1, title: t("home"), href: "" },
        { id: 2, title: t("browse-listing"), href: "browse-listing" },
        { id: 3, title: t("find-partner"), href: "find-partner" },
        { id: 4, title: t("pricing"), href: "pricing" },
        { id: 5, title: t("blog"), href: "blog" },
    ]

    const handleLogout = () => {
        user.clearUser()
        localStorage.clear()
        router.push(`/${locale}`)
    }

    console.log(user.user)

    return (
        <header className="max-w-7xl mx-auto flex items-center justify-around py-5 px-1 md:px-0">
            <Link href={`/${locale}`}>
                <Image src="/sharkmkt-logo.png" width={300} height={100} alt="Logo" />
            </Link>

            <nav className="hidden md:flex gap-6 mr-6">
                {links.map((link) => {
                    const fullPath = `/${locale}/${link.href}`
                    const isActive =
                        pathname === fullPath ||
                        (link.href === "" && pathname === `/${locale}`)

                    return (
                        <Link
                            key={link.id}
                            href={fullPath}
                            className={cn(
                                "font-semibold pb-1 transition-colors",
                                isActive
                                    ? "border-b-2 border-primary text-primary"
                                    : "border-b-2 border-transparent hover:border-primary"
                            )}
                        >
                            {link.title}
                        </Link>
                    )
                })}
            </nav>

            <div>
                {user.user ? (
                    <div className='flex gap-2'>
                        <LocaleToggle />
                        <Button onClick={() => handleLogout()}>{t("logout")}</Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <LocaleToggle />
                        <Button asChild>
                            <Link href={`/${locale}/login`}>
                                {t("login-register")}
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}
