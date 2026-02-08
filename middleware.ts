import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing)
const defaultLocale = routing.defaultLocale

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Let static files (images, fonts, etc.) and /placeholders be served directly from public
    if (
        pathname.startsWith("/placeholders") ||
        /\.(png|svg|ico|jpg|jpeg|gif|webp|woff2?|css|js)$/i.test(pathname)
    ) {
        return NextResponse.next()
    }

    // If path has no locale prefix (e.g. /login, /register), redirect to defaultLocale + path
    // so next-intl doesn't drop the path and send user to home
    const hasLocalePrefix = /^\/(ar|en)(\/|$)/.test(pathname)
    if (!hasLocalePrefix && (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password")) {
        const url = req.nextUrl.clone()
        url.pathname = `/${defaultLocale}${pathname}`
        return NextResponse.redirect(url)
    }

    const token = req.cookies.get("access_token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");

    const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
    const locale = localeMatch ? localeMatch[1] : defaultLocale

    const protectedRoutes = ["/admin"];
    const authRoutes = ["/login", "/register", "/forgot-password"]

    // Prevent authenticated users from accessing auth routes
    if (token && authRoutes.some(route => pathname.includes(route))) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!token && protectedRoutes.some(route => pathname.includes(route))) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }

    return intlMiddleware(req)
}

// export const confg = {
//     matcher: ["/","(ar|en)/:path*"]
// }

export const config = {
    matcher: [
        "/((?!api|_next|_vercel).*)",
    ],
}

// import { NextRequest, NextResponse } from "next/server"
// import { routing } from "./i18n/routing"
// import createMiddleware from "next-intl/middleware"

// const intlMiddleware = createMiddleware(routing)

// export function middleware(req: NextRequest) {
//     const pathname = req.nextUrl.pathname

//     if (pathname.startsWith("/api")) {
//         return NextResponse.next()
//     }

//     const localePrefix = /^\/(en|ar)(\/|$)/
//     if (localePrefix.test(pathname) && pathname.includes("/_next")) {
//         const rewritePath = pathname.replace(/^\/(en|ar)/, "") || "/"
//         const url = req.nextUrl.clone()
//         url.pathname = rewritePath
//         return NextResponse.rewrite(url)
//     }

//     if (
//         pathname.includes("/_next") ||
//         pathname.includes("/_vercel") ||
//         /\.(css|js|ico|woff2?|png|jpg|jpeg|gif|svg|webp)$/i.test(pathname)
//     ) {
//         return NextResponse.next()
//     }

//     const token =
//         req.cookies.get("access_token")?.value ||
//         req.headers.get("Authorization")?.replace("Bearer ", "")

//     const response = intlMiddleware(req)
//     console.log(token)
//     if (token) {
//         response.headers.set("x-auth-token", "present")
//     }

//     return response
// }

// export const config = {
//     matcher: [
//         "/((?!api|_next|_vercel).*)",
//     ],
// }