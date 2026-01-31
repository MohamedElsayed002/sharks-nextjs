# Auth: Global User State & Token Storage

This document explains how user data and access tokens are managed globally, how tokens are stored securely, and how logged-in users are prevented from accessing auth pages (login/register).

---

## Overview

| Before | After |
|--------|-------|
| User fetched only on dashboard page | User fetched globally in `AuthHydration` (runs once per app load) |
| Token stored in `localStorage` directly | Token stored in Zustand persist (single source of truth) |
| User lost on reload when on other pages | User + token persisted to `localStorage` via Zustand, rehydrated on any page |
| Logged-in users could access login/register | `AuthRedirectGuard` redirects logged-in users to dashboard |
| `localStorage.clear()` on logout (clears everything) | `clearUser()` clears only auth data from store |

---

## 1. Zustand Auth Store with Persist

**File:** `context/user.ts`

The auth store uses Zustand with the `persist` middleware to:

- Store `user` and `accessToken` in a single place
- Persist both to `localStorage` under the key `"shark-auth"`
- Rehydrate from storage when the app loads

**Why Zustand persist instead of raw `localStorage`?**

- Single source of truth — no scattered `localStorage.getItem("access_token")` calls
- Token and user stay in sync — cleared together on logout
- Type-safe — store is typed
- SSR-safe — uses `skipHydration: true` and a noop storage on the server

**State shape:**
```ts
{
  user: User | null
  accessToken: string | null
  hydrated: boolean   // set when rehydration + fetch is done
  setUser, setToken, setAuth, clearUser, setHydrated
}
```

**Persisted fields only:** `user`, `accessToken` (not `hydrated` or functions).

---

## 2. Token Storage — Better Approach

**Previous:** `localStorage.setItem("access_token", token)` in `useLogin`, read directly from `localStorage` in multiple places.

**Current:**
- Token stored in Zustand store via `setToken(token)`
- Persisted to `localStorage` under `"shark-auth"` by Zustand
- Read via `useAuthStore((s) => s.accessToken)` or `useAuthStore.getState().accessToken`

**Benefits:**
1. Centralized — one place to set and read
2. Synced with user — both cleared on logout
3. No direct `localStorage` access for auth — easier to change storage strategy later

**Optional improvement (not implemented):** Use `sessionStorage` instead of `localStorage` for the persist storage — token would be cleared when the tab closes, reducing exposure to XSS. Change in `context/user.ts`:
```ts
storage: createJSONStorage(() => sessionStorage)
```

---

## 3. AuthHydration — Global User Fetch

**File:** `components/auth/AuthHydration.tsx`

**Role:** Runs once when the app loads (in `Providers`). Responsible for:

1. **Rehydrating** — Loading persisted `user` and `accessToken` from `localStorage`
2. **Fetching user if needed** — If we have `accessToken` but no `user`, call `/user/me` via server action and set user
3. **Invalid token** — If fetch fails or returns invalid data, call `clearUser()`
4. **Marking ready** — Set `hydrated: true` when done

**Flow:**
```
App loads → AuthHydration mounts → rehydrate() from localStorage
  → If token && !user: fetch /user/me, setUser(data)
  → If token invalid: clearUser()
  → setHydrated(true)
```

**Placement:** Inside `Providers` (root layout) so it runs for all pages.

---

## 4. Dashboard Page — Removed Fetch

**File:** `app/[locale]/(dashboard)/page.tsx`

**Change:** Removed the `useEffect` that fetched `/user/me` when the page mounted.

**Reason:** User is now loaded globally by `AuthHydration`. The dashboard (and any other page) uses `useAuthStore((s) => s.user)` and gets the user without fetching.

---

## 5. AuthRedirectGuard — Prevent Logged-in Access to Auth Pages

**File:** `components/auth/AuthRedirectGuard.tsx`

**Role:** Wraps auth layout (login, register, forgot-password). Redirects to dashboard if the user is already logged in.

**Flow:**
1. Wait for `hydrated` (auth state is ready)
2. If `user` exists → `router.replace("/")` (dashboard)

**Placement:** Wraps the auth layout in `app/[locale]/(auth)/layout.tsx`.

**Why wait for `hydrated`?** On first render, Zustand hasn’t rehydrated yet, so `user` may be `null` even if the user is logged in. Waiting for `hydrated` avoids a brief flash of the login page before redirecting.

---

## 6. Login Flow — useLogin

**File:** `hooks/use-login.tsx`

**Change:** Instead of `localStorage.setItem("access_token", data.access_token)`, calls `setToken(data.access_token)` from the auth store.

Token is persisted by Zustand; user is fetched by `AuthHydration` on next render or when navigating.

---

## 7. Logout Flow — Navbar

**File:** `components/shared/navbar.tsx`

**Change:** Removed `localStorage.clear()` and only call `user.clearUser()`.

**Reason:** `clearUser()` clears `user` and `accessToken` in the store. Zustand persist updates `localStorage`, so other app data in `localStorage` is not wiped.

---

## 8. Create Service — Token Source

**File:** `components/create-service/index.tsx`

**Change:** Replaced `localStorage.getItem('access_token')` with `useAuthStore.getState().accessToken`.

---

## File Summary

| File | Change |
|------|--------|
| `context/user.ts` | Added Zustand persist, `accessToken`, `setToken`, `setAuth`, `clearUser` (clears both) |
| `components/auth/AuthHydration.tsx` | New — rehydrate + fetch user if token exists |
| `components/auth/AuthRedirectGuard.tsx` | New — redirect logged-in users away from auth pages |
| `utils/providers/index.tsx` | Added `AuthHydration` |
| `app/[locale]/(auth)/layout.tsx` | Wrapped with `AuthRedirectGuard` |
| `app/[locale]/(dashboard)/page.tsx` | Removed user fetch `useEffect` |
| `hooks/use-login.tsx` | Use `setToken` instead of `localStorage.setItem` |
| `components/shared/navbar.tsx` | Use `clearUser()` only, removed `localStorage.clear()` |
| `components/create-service/index.tsx` | Use `useAuthStore.getState().accessToken` |
| `actions/auth.ts` | New — `getMe(token)` server action for fetching user |

---

## Data Flow Diagram

```
Login success
    → setToken(access_token)
    → Zustand persists to localStorage
    → User navigates to dashboard
    → AuthHydration already ran (or runs)
    → Has token, no user → fetch /user/me → setUser
    → Navbar shows user name

Reload on /browse-listing/xyz
    → AuthHydration runs
    → rehydrate() loads user + token from localStorage
    → User and token in store
    → Navbar shows user name (no fetch needed if user was persisted)

Logout
    → clearUser()
    → Store: user=null, accessToken=null
    → Zustand persist updates localStorage
    → Redirect to /
```

---

## Security Notes

- **Token in localStorage:** Accessible to JavaScript (XSS). Prefer httpOnly cookies if the backend supports them.
- **Alternative:** Use `sessionStorage` in the persist config to clear the token when the tab closes.
