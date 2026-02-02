# Token Storage & Security

This document explains how the access token is stored when the user logs in, how the middleware reads it, and the security measures in place.

---

## Overview

| What | Where | Purpose |
|------|--------|---------|
| **httpOnly cookie** | Set by API route `/api/auth/set-token` | Secure storage; readable by server/middleware only; not accessible to JavaScript (XSS protection) |
| **Zustand store** | Client (persisted to localStorage) | Client-side use (e.g. `Authorization` header for API calls, navbar state) |
| **Middleware** | Runs on every request | Reads token from cookie (or `Authorization` header) for auth checks or headers |

---

## 1. Login Flow — Where the Token Is Saved

When the user logs in successfully (`use-login.tsx`):

1. **Backend** returns `{ access_token: "..." }`.
2. **Client** (`useLogin` `onSuccess`):
   - Calls `setToken(access_token)` → token is stored in **Zustand** (and persisted to localStorage).
   - Calls **`POST /api/auth/set-token`** with `{ token: access_token }`.
3. **API route** `/api/auth/set-token`:
   - Validates the body.
   - Sets a cookie:
     - **Name:** `access_token`
     - **httpOnly:** `true` (not readable by JavaScript)
     - **Secure:** `true` in production (HTTPS only)
     - **sameSite:** `lax`
     - **path:** `/`
     - **maxAge:** 7 days

So after login the token exists in:

- **Cookie** → for server/middleware (secure, not exposed to JS).
- **Zustand (and localStorage)** → for client-side requests that need the token.

---

## 2. Why Use an httpOnly Cookie?

- **XSS:** Scripts cannot read the cookie, so a stolen token from the DOM/localStorage is not possible via the cookie.
- **Middleware:** The server can read the cookie on every request and enforce auth or pass a hint (e.g. `x-auth-token: present`) without exposing the token to the client.
- **Same-site:** `sameSite: "lax"` reduces CSRF risk while allowing normal navigation.

The token is still kept in Zustand so existing client code (e.g. `Authorization: Bearer <token>`) keeps working without changing every call. For maximum security you could stop storing the token on the client and proxy all authenticated requests through API routes that read the cookie.

---

## 3. Middleware — How It Gets the Token

**File:** `middleware.ts`

The middleware:

1. Reads the token from:
   - **Cookie:** `req.cookies.get("access_token")?.value`
   - **Header (fallback):** `req.headers.get("Authorization")?.replace("Bearer ", "")`
2. Runs **next-intl** middleware and gets its response.
3. If a token is present, sets a response header `x-auth-token: present` (so downstream or future logic can know the user is authenticated without reading the token).
4. Returns the response (so locale routing still works).

So the middleware **gets** the token from the cookie (or header) and can use it for protection or headers; it does not log or expose the token value.

---

## 4. Logout — Clearing the Token

On logout (`navbar.tsx`):

1. **Client** calls `clearUser()` → clears user and token from Zustand (and localStorage).
2. **Client** calls **`POST /api/auth/clear-token`**.
3. **API route** `/api/auth/clear-token` sets the `access_token` cookie with `maxAge: 0`, so the browser removes it.

Both the client store and the cookie are cleared so the user is fully logged out.

---

## 5. API Routes Summary

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/set-token` | POST | Body: `{ token }`. Sets httpOnly cookie with the token. Called after login. |
| `/api/auth/clear-token` | POST | Clears the `access_token` cookie. Called on logout. |

---

## 6. Security Summary

| Measure | Description |
|---------|-------------|
| **httpOnly** | Cookie not readable by JavaScript → reduces XSS token theft. |
| **Secure** | Cookie sent only over HTTPS in production. |
| **sameSite: lax** | Limits cross-site request usage of the cookie. |
| **Server-only set/clear** | Cookie is set and cleared only by API routes, not by client script. |
| **Middleware** | Can enforce or signal auth using the cookie without exposing the token to the client. |

The token is still stored in Zustand/localStorage for convenience. If you want to avoid storing the token on the client at all, you would:

- Not persist the token in Zustand.
- Proxy authenticated requests through Next.js API routes that read the cookie and call the backend with the token.

---

## 7. File Reference

| File | Role |
|------|------|
| `app/api/auth/set-token/route.ts` | Sets httpOnly `access_token` cookie (POST, body: `{ token }`). |
| `app/api/auth/clear-token/route.ts` | Clears `access_token` cookie (POST). |
| `hooks/use-login.tsx` | On login success: `setToken` + `POST /api/auth/set-token`. |
| `components/shared/navbar.tsx` | On logout: `clearUser` + `POST /api/auth/clear-token`. |
| `middleware.ts` | Reads token from cookie (or `Authorization`), runs intl middleware, sets `x-auth-token` if present. |
