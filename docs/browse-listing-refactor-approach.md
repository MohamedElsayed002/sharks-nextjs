# Browse Listing Refactor — Approach & Learning Notes

This document explains the approach taken to refactor the browse listing page: moving filtering to the backend via URL params and adding a sidebar search.

---

## Goal

1. **Sidebar search** — Search by product title/name
2. **Remove client-side filtering** — Use backend for `search` and `category`
3. **Keep sort in URL** — Newest/oldest stays as a URL param (`?sort=newest`)

---

## Approach Overview

| Before | After |
|--------|-------|
| All products fetched, then filtered in the browser | Products fetched with filters applied by the backend |
| Category: multi-select, client-side filter | Category: single-select, passed to backend via URL |
| Search: none | Search: input in sidebar, passed to backend via URL |
| Sort: client-side after filtering | Sort: in URL, applied in server action |

---

## 1. URL as Single Source of Truth

**Idea:** Use URL search params for all filters so that:

- State is shareable (e.g. `/browse-listing?search=computer&category=Computer&sort=newest`)
- Back/forward works as expected
- The page can be bookmarked
- Server components can read filters and fetch the right data

**URL params used:**

- `search` — Search term for product title
- `category` — Selected category (single value)
- `sort` — `"newest"` or `"oldest"`

---

## 2. Server-First Data Flow

**Flow:**

```
User visits /browse-listing?search=computer&category=Computer
    ↓
Page (Server Component) reads searchParams
    ↓
Calls getProducts(locale, { search, category, sort })
    ↓
Fetches from: /services/get-all-products?lang=en&search=computer&category=Computer
    ↓
Sorts results in server action (backend may not support sort)
    ↓
Passes filtered products + initial filter values to client component
```

**Why server-first?**

- Filters are applied where the API supports them (search, category)
- Sorting can be done in the server action if the API does not support it
- Client component only displays data and updates the URL

---

## 3. Client Component Responsibilities

The client component (`BrowseListingView`) does **not** filter data. It:

1. **Displays** — Shows products received from the server
2. **Captures input** — Search field, category checkboxes, sort dropdown
3. **Updates URL** — Uses `router.push()` with new search params
4. **Keeps in sync** — Updates local search input when URL changes (e.g. Clear All)

**Pattern:** User action → update URL → Next.js re-renders page → server fetches new data → client renders new products.

---

## 4. Files Changed & Their Roles

| File | Change |
|------|--------|
| `actions/index.tsx` | `getProducts` accepts `search`, `category`, `sort`; builds API URL; sorts in server; `getCategories` added |
| `app/.../browse-listing/page.tsx` | Reads `searchParams`, passes filters to `getProducts`, fetches products + categories |
| `BrowseListingView.tsx` | Search form, URL updates via `router.push`, no client-side filtering |
| `Filters.tsx` | Single category select, callbacks that update URL |
| `i18n/messages/*.json` | New keys for sidebar search |

---

## 5. Useful Patterns

### Reading search params in a Server Component (Next.js 15+)

```ts
interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: PageProps) {
  const sp = await props.searchParams
  const search = typeof sp?.search === "string" ? sp.search : ""
  const category = typeof sp?.category === "string" ? sp.category : ""
  // ...
}
```

### Updating URL from a Client Component

```ts
const router = useRouter()
const pathname = usePathname()
const searchParams = useSearchParams()

function applyFilters(updates) {
  const next = new URLSearchParams(searchParams)
  if (updates.search !== undefined) next.set("search", updates.search)
  router.push(`${pathname}?${next.toString()}`)
}
```

### Syncing local state with URL

```ts
const [searchInput, setSearchInput] = useState(initialSearch)

// When URL changes (e.g. Clear All or back navigation), sync local state
useEffect(() => setSearchInput(initialSearch), [initialSearch])
```

---

## 6. Decisions & Tradeoffs

| Decision | Reason |
|----------|--------|
| Sort in server action instead of backend | Backend might not support sort; server action can sort after fetch |
| Single category vs multi | Backend API uses one `category` param |
| `getCategories` as separate call | Needed for full category list; could be optimized later (e.g. dedicated API) |
| `useSearchParams` from `next/navigation` | `useSearchParams` not re-exported from next-intl routing |

---

## 7. Summary

- **URL** drives filters; no separate client filter state.
- **Server** reads URL, fetches, and passes data down.
- **Client** renders data and updates URL on user actions.
- Flow: user action → URL update → server refetch → new data rendered.
