"use client"

import React, { useEffect, useState } from "react"
import { useAuthStore } from "@/context/user"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import LocaleToggle from "./toggle-locale"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Navbar = () => {
  const locale = useLocale()
  const t = useTranslations()
  const pathname = usePathname()
  const user = useAuthStore((state) => state)
  const router = useRouter()

  // control the sheet open state so we can close it programmatically
  const [open, setOpen] = useState(false)

  const links = [
    { id: 1, title: t("home"), href: "" },
    { id: 2, title: t("browse-listing"), href: "browse-listing" },
    { id: 3, title: t("find-partner"), href: "find-partner" },
    { id: 4, title: t("pricing"), href: "pricing" },
    // { id: 5, title: t("blog"), href: "blog" },
  ]



  const handleLogout = () => {
    setOpen(false)
    user.clearUser()
    router.push(`/${locale}`)
  }

  return (
    <header className="max-w-7xl mx-auto flex items-center justify-between py-5 px-4 md:px-0">
      <Link href={`/${locale}`} className="flex items-center">
        <Image src="/sharkmkt-logo.png" width={220} height={72} alt="Logo" />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 mr-6">
        {links.map((link) => {
          const fullPath = `/${locale}/${link.href}`
          const isActive =
            pathname === fullPath || (link.href === "" && pathname === `/${locale}`)

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

      {/* Desktop actions */}
      <div className="hidden md:flex items-center gap-3">
        <LocaleToggle />
        {user.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{t("hello")} {user.user.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                {
                  user.user.role === 'Admin' && (
                    <DropdownMenuItem>
                      <Link href={`/${locale}/user/admin`}>Admin</Link>
                    </DropdownMenuItem>
                  )
                }
                <DropdownMenuItem>
                  <Link href={`/${locale}/user/profile`}>{t("profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${locale}/user/onboarding`}>Onboarding</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${locale}/add-service`}>Add Service</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={handleLogout}>{t("logout")}</Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href={`/${locale}/login`}>{t("login-register")}</Link>
          </Button>
        )}
      </div>

      {/* Mobile sheet */}
      <div className="flex md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            {/* icon button */}
            <button
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </button>
          </SheetTrigger>

          {/* Sheet content: right side, full-height style */}
          <SheetContent side="right" className="w-[85vw] sm:w-[420px] p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Image src="/sharkmkt-logo.png" width={120} height={36} alt="Logo" />
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 hidden"
                >
                  <X />
                </button>
              </SheetHeader>

              {/* Links area (scrollable) */}
              <div className="flex-grow overflow-auto px-6 py-6 space-y-3">
                {links.map((link) => {
                  const fullPath = `/${locale}/${link.href}`
                  const isActive =
                    pathname === fullPath ||
                    (link.href === "" && pathname === `/${locale}`)

                  return (
                    // SheetClose with asChild will auto-close when the Link is clicked
                    <SheetClose asChild key={link.id}>
                      <Link
                        href={fullPath}
                        className={cn(
                          "block w-full text-lg font-medium px-4 py-3 rounded-md transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                        )}
                      >
                        {link.title}
                      </Link>
                    </SheetClose>
                  )
                })}
              </div>

              {/* Footer pinned to bottom */}
              <SheetFooter className="border-t px-6 py-4">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <LocaleToggle />
                    {/* optional small user info */}
                    {user.user && (
                      <div className="text-sm text-muted-foreground">{user.user.email}</div>
                    )}
                  </div>

                  {user.user ? (
                    <Button
                      className="w-full"
                      onClick={() => {
                        // ensure sheet closes and then logout/navigate
                        setOpen(false)
                        handleLogout()
                      }}
                    >
                      {t("logout")}
                    </Button>
                  ) : (
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href={`/${locale}/login`}>{t("login-register")}</Link>
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
