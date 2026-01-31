# Single Service Page — Component Structure & Architecture

This document explains the structure of the single service listing page, how components are organized, and how they work together.

---

## Overview

The single service page displays a detailed view of a business listing that is for sale. Interested users can explore the listing and, when ready, reveal the seller's contact information to get in touch.

**Route:** `/[locale]/browse-listing/[serviceId]`

---

## Folder Structure

```
components/single-service/
├── index.tsx           # Main wrapper — orchestrates data fetching & layout
├── ServiceHero.tsx     # Hero image, title, category, verification badge
├── ServiceStats.tsx    # Financial overview (revenue, expenses, profit)
├── ServiceDescription.tsx  # About / description text
├── ServiceIncomeSources.tsx  # Income sources (e.g. Streaming, Ads)
├── ServiceRevenueProofs.tsx  # Revenue proof images/documents
└── SellerCard.tsx      # Seller contact — revealed on "I'm interested"
```

---

## Component Roles

### 1. `index.tsx` — Main Wrapper

**Role:** Entry point that fetches data, handles loading/error states, and composes all child components.

**Responsibilities:**
- Fetches service data via `getSingleServiceUser(serviceId)` (React Query)
- Picks the right localized detail (en/ar) from `details` array
- Renders loading skeletons
- Renders error message if fetch fails
- Layout: hero full-width, then two-column grid (main content + sidebar)

**Data flow:**
```
serviceId (from URL) → useQuery → data → getDetailForLocale(data, locale) → props to children
```

---

### 2. `ServiceHero.tsx`

**Role:** Hero section with listing image and main headline.

**Props:** `title`, `category`, `imageUrl`, `verificationLevel`

**UI:**
- Full-width aspect image (21:9)
- Gradient overlay for readability
- Category badge
- Verification level badge (e.g. "basic")
- Title overlaid at bottom

---

### 3. `ServiceStats.tsx`

**Role:** Financial overview card.

**Props:** `averageMonthlyRevenue`, `averageMonthlyExpenses`, `netProfit`, `isProfitable`

**UI:**
- Profitable / Not Profitable badge
- Three stat cards: Monthly Revenue, Monthly Expenses, Net Profit
- Icons and color coding (green revenue, amber expenses, blue profit)
- Renders only if at least one stat exists

---

### 4. `ServiceDescription.tsx`

**Role:** About / description section.

**Props:** `description`

**UI:**
- Card with "About This Listing" heading
- Multi-line description (whitespace preserved)
- Renders only if description exists

---

### 5. `ServiceIncomeSources.tsx`

**Role:** List of income sources (e.g. Streaming, E-commerce).

**Props:** `incomeSources` (string[])

**UI:**
- Badges for each source
- Renders only if array has items

---

### 6. `ServiceRevenueProofs.tsx`

**Role:** Revenue proof documents / images.

**Props:** `revenueProofs` (array of { fileUrl, fileType, ... })

**UI:**
- Grid of proof items
- Images: clickable, open in new tab
- Non-images: link with "View proof document"
- Handles `blob:` URLs (e.g. from uploads) via `unoptimized` prop on Next.js Image

---

### 7. `SellerCard.tsx` — Reveal on Interest

**Role:** Seller contact info, shown only when user indicates interest.

**Props:** `owner` ({ name, email, phone?, location? })

**Pattern — Reveal on Interest:**
1. Initially: CTA text + button "I'm interested — Show contact"
2. On click: reveals owner name, email, phone, location
3. Email/phone are clickable (`mailto:`, `tel:`)
4. "Send Email" button for quick contact

**Why?** Reduces spam and ensures only serious buyers see contact details.

---

## Data Shape (Backend Response)

```ts
{
  _id: string
  details: [{ lang, title, slug, description, ... }, ...]  // en + ar
  owner: { _id, name, email, phone?, location?, ... }
  imageUrl?: string
  category: string
  isProfitable?: boolean
  averageMonthlyRevenue?: number
  averageMonthlyExpenses?: number
  netProfit?: number
  incomeSources?: string[]
  revenueProofs?: [{ fileUrl, fileType, source, ... }]
  verificationLevel?: string
  ...
}
```

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ServiceHero (full width)                               │
│  [Image + Title + Category + Verification]              │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────┐
│  Main (1fr)                  │  Sidebar (340px)         │
│  ┌────────────────────────┐  │  ┌────────────────────┐  │
│  │ ServiceStats           │  │  │ SellerCard         │  │
│  └────────────────────────┘  │  │ (sticky)           │  │
│  ┌────────────────────────┐  │  │ [Reveal contact]   │  │
│  │ ServiceDescription     │  │  └────────────────────┘  │
│  └────────────────────────┘  │                          │
│  ┌────────────────────────┐  │                          │
│  │ ServiceIncomeSources   │  │                          │
│  └────────────────────────┘  │                          │
│  ┌────────────────────────┐  │                          │
│  │ ServiceRevenueProofs   │  │                          │
│  └────────────────────────┘  │                          │
└──────────────────────────────┴──────────────────────────┘
```

**Responsive:** On mobile, sidebar appears below main content. On `lg` breakpoint, two-column grid.

---

## i18n Namespace: `singleService`

Keys used for translations (en + ar):

| Key | Usage |
|-----|-------|
| financial-overview | ServiceStats header |
| monthly-revenue, monthly-expenses, net-profit | Stat labels |
| profitable, not-profitable | Badge text |
| about-listing | ServiceDescription header |
| income-sources | ServiceIncomeSources header |
| revenue-proof | ServiceRevenueProofs header |
| view-proof-document | Non-image proof link |
| seller-info | SellerCard header |
| interested-cta | CTA text before reveal |
| show-contact | Reveal button |
| send-email | Email button |

---

## Key Patterns

### 1. Locale-aware content

```ts
function getDetailForLocale(service, locale) {
  const lang = locale === "ar" ? "ar" : "en"
  const detail = service.details?.find((d) => d.lang === lang)
  return detail ?? service.details?.[0]
}
```

Uses first matching locale, falls back to first detail.

### 2. Conditional rendering

Most sections render only if data exists:
- `ServiceStats` — if any financial stat
- `ServiceDescription` — if description non-empty
- `ServiceIncomeSources` — if array length > 0
- `ServiceRevenueProofs` — if array length > 0
- `SellerCard` — if `owner` is an object

### 3. Reveal on interest

`SellerCard` keeps a local `showContact` state. Clicking "I'm interested" flips it and shows owner info. No backend call needed.

---

## Adding a New Section

1. Create `components/single-service/ServiceNewSection.tsx`
2. Add i18n keys to `singleService` in `en.json` and `ar.json`
3. Import and render in `index.tsx` inside the main column
4. Pass props from `data` and `detail` as needed
