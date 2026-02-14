"use client"

import { useState } from "react"
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
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronDown, MenuIcon, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Navbar = () => {
  const locale = useLocale()
  const t = useTranslations()
  const pathname = usePathname()
  const user = useAuthStore((state) => state)
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const links = [
    { id: 1, title: t("home"), href: "" },
    { id: 2, title: t("browse-listing"), href: "browse-listing" },
    { id: 3, title: t("chat.messages"), href: "chat" },
    { id: 4, title: t("find-partner"), href: "find-partner" },
  ]



  const handleLogout = () => {
    setOpen(false)
    user.clearUser()
    fetch("/api/auth/clear-token", { method: "POST" }).catch(() => { })
    router.push(`/${locale}`)
  }


  const token = useAuthStore((s) => s.accessToken)
  const { data: unreadData } = useQuery({
    queryKey: ["unread-count", token],
    queryFn: () => getUnreadCount(token!),
    enabled: !!token && !!user.user,
  })
  const unreadCount = unreadData?.count ?? 0


  return (
    <header className="relative z-20 w-full bg-[#F9F8F4] pt-10 transition-colors md:pt-2">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href={`/${locale}`} className="flex shrink-0 items-center">
          <Image
            src="/sharkmkt-logo.png"
            width={120}
            height={72}
            alt="Logo"
            className="h-9 w-auto sm:h-10 md:h-[72px] md:w-[220px]"
          />
        </Link>

        {/* Desktop nav – hero style: gold active, slate text */}
        <nav className="mr-6 hidden md:flex gap-6">
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
                  "relative inline-flex items-center gap-1 pb-1 font-semibold transition-colors",
                  isActive
                    ? "border-b-2 border-[#C9A227] text-slate-800"
                    : "border-b-2 border-transparent text-slate-600 hover:border-[#C9A227]/50 hover:text-slate-800"
                )}
              >
                {link.title}
                {showUnread && (
                  <span
                    className="flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                    aria-label={t("unreadMessages", { count: unreadCount })}
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
                <button
                  aria-label={t("hello") + " " + user.user.name}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-0.5 pr-3 py-1 outline-none transition-shadow hover:bg-slate-50 hover:shadow-sm",
                    "focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F8F4]"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    {user.user.imageUrl && (
                      <AvatarImage src={user.user.imageUrl} alt={user.user.name} />
                    )}
                    <AvatarFallback className="text-sm font-medium bg-muted">
                      {user.user.name?.charAt(0)?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {user.user.name}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 px-2 py-2 mb-1">
                  <Avatar className="h-8 w-8">
                    {user.user.imageUrl && (
                      <AvatarImage src={user.user.imageUrl} alt={user.user.name} />
                    )}
                    <AvatarFallback className="text-xs">
                      {user.user.name?.charAt(0)?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-medium">{user.user.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{user.user.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {user.user.role === "Admin" && (
                    <DropdownMenuItem asChild>
                      <Link href={`/${locale}/user/admin`}>{t("admin")}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/user/profile`}>{t("profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/add-service`}>{t("addServiceNav")}</Link>
                  </DropdownMenuItem>
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
            <Button asChild className="rounded-xl bg-[#C9A227] text-white hover:bg-[#B8921F]">
              <Link href={`/${locale}/login`}>{t("login-register")}</Link>
            </Button>
          )}
        </div>

        {/* Mobile sheet */}
        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={t("openMenu")}
                className="rounded-md p-2 text-slate-700 hover:bg-slate-200"
                onClick={() => setOpen(true)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </SheetTrigger>

            {/* Sheet content: right side, full-height style */}
            <SheetContent side="right" className="w-[85vw] border-slate-200 bg-white p-0 sm:w-[420px]">
              <div className="flex h-full flex-col">
                <SheetHeader className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-[#F9F8F4]">
                  <div className="flex items-center gap-3 [&_img]:mix-blend-lighten">
                    <Image
                      src="/sharkmkt-logo.png"
                      width={120}
                      height={36}
                      alt="Logo"
                      unoptimized
                    />
                  </div>
                  <button
                    aria-label={t("closeMenu")}
                    onClick={() => setOpen(false)}
                    className="hidden rounded-md p-2 hover:bg-slate-200"
                  >
                    <X />
                  </button>
                </SheetHeader>

                {/* Links area (scrollable) */}
                <div className="grow overflow-auto px-6 py-6 space-y-3">
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
                            "flex w-full items-center justify-between rounded-md px-4 py-3 text-lg font-medium transition-colors",
                            isActive
                              ? "bg-[#C9A227]/10 text-slate-800"
                              : "text-slate-700 hover:bg-slate-100"
                          )}
                        >
                          {link.title}
                          {showUnreadMobile && (
                            <span
                              className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white"
                              aria-label={t("unreadMessages", { count: unreadCount })}
                            >
                              {unreadCount > 99 ? "99+" : unreadCount}
                            </span>
                          )}
                        </Link>
                      </SheetClose>
                    )
                  })}
                </div>

                <SheetFooter className="border-t border-slate-200 bg-[#F9F8F4] px-6 py-4">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-3">
                      <LocaleToggle />
                      {/* optional small user info */}
                      {user.user && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            {user.user.imageUrl && (
                              <AvatarImage src={user.user.imageUrl} alt={user.user.name} />
                            )}
                            <AvatarFallback className="text-xs">
                              {user.user.name?.charAt(0)?.toUpperCase() ?? "?"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{user.user.email}</span>
                        </div>
                      )}
                    </div>

                    {user.user ? (
                      <Button
                        className="w-full rounded-xl bg-slate-800 text-white hover:bg-slate-700"
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
                        <Button asChild className="w-full rounded-xl bg-[#C9A227] text-white hover:bg-[#B8921F]">
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
