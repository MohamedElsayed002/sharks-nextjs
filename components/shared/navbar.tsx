"use client"

import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/context/user"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import LocaleToggle from "./toggle-locale"
import { getUnreadCount } from "@/lib/conversations-api"
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
    { id: 3, title: t("chat.messages"), href: "chat" },
    { id: 4, title: t("find-partner"), href: "find-partner" },
    { id: 5, title: t("pricing"), href: "pricing" },
  ]



  const handleLogout = () => {
    setOpen(false)
    user.clearUser()
    fetch("/api/auth/clear-token", { method: "POST" }).catch(() => { })
    router.push(`/${locale}`)
  }

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`

  const token = useAuthStore((s) => s.accessToken)
  const { data: unreadData } = useQuery({
    queryKey: ["unread-count", token],
    queryFn: () => getUnreadCount(token!),
    enabled: !!token && !!user.user,
  })
  const unreadCount = unreadData?.count ?? 0

  console.log(unreadCount)

  return (
    <header
      className={cn(
        "relative z-20 w-full transition-colors pt-10 md:pt-2",
        isHome
          ? "bg-transparent text-white"
          : "bg-background text-foreground"
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href={`/${locale}`} className="flex items-center shrink-0">
          <Image
            src="/sharkmkt-logo.png"
            width={120}
            height={72}
            alt="Logo"
            unoptimized
            className={cn("h-9 w-auto sm:h-10 md:h-[72px] md:w-[220px]", isHome && "invert")}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 mr-6">
          {links.map((link) => {
            const fullPath = `/${locale}/${link.href}`
            const isActive =
              pathname === fullPath || (link.href === "" && pathname === `/${locale}`)
            const isMessages = link.href === "chat"
            const showUnread = isMessages && unreadCount > 0

            return (
              <Link
                key={link.id}
                href={fullPath}
                className={cn(
                  "font-semibold pb-1 transition-colors relative inline-flex items-center gap-1",
                  isHome
                    ? isActive
                      ? "border-b-2 border-white text-white"
                      : "border-b-2 border-transparent text-white/90 hover:text-white hover:border-white/50"
                    : isActive
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-transparent hover:border-primary"
                )}
              >
                {link.title}
                {showUnread && (
                  <span
                    className={cn(
                      "flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold shrink-0",
                      isHome ? "bg-red-500 text-white" : "bg-destructive text-destructive-foreground"
                    )}
                    aria-label={`${unreadCount} unread messages`}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
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
                <Button
                  variant={isHome ? "secondary" : "outline"}
                  className={isHome ? "bg-white/15 text-white border-white/30 hover:bg-white/25" : ""}
                >
                  {t("hello")} {user.user.name}
                </Button>
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
            <Button
              asChild
              className={isHome ? "bg-white text-slate-900 hover:bg-white/95" : ""}
            >
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
                className={cn(
                  "p-2 rounded-md",
                  isHome ? "text-white hover:bg-white/15" : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                )}
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
                    <Image
                      src="/sharkmkt-logo.png"
                      width={120}
                      height={36}
                      alt="Logo"
                      unoptimized
                    />
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
                    const isMessages = link.href === "chat"
                    const showUnreadMobile = isMessages && unreadCount > 0

                    return (
                      <SheetClose asChild key={link.id}>
                        <Link
                          href={fullPath}
                          className={cn(
                            "flex items-center justify-between w-full text-lg font-medium px-4 py-3 rounded-md transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                          )}
                        >
                          {link.title}
                          {showUnreadMobile && (
                            <span
                              className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold"
                              aria-label={`${unreadCount} unread messages`}
                            >
                              {unreadCount > 99 ? "99+" : unreadCount}
                            </span>
                          )}
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
      </div>
    </header>
  )
}
