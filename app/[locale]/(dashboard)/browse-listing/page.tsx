import { getProducts, getCategories } from "@/actions"
import { BrowseListingView } from "@/components/browse-listing"

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function getIncomeSourcesFromProducts(products: Awaited<ReturnType<typeof getProducts>>): string[] {
  const set = new Set<string>()
  for (const p of products) {
    for (const s of p.incomeSources ?? []) {
      if (s?.trim()) set.add(s.trim())
    }
  }
  return Array.from(set).sort()
}

export default async function BrowseListingPage(props: PageProps) {
  const { locale } = await props.params
  const sp = await props.searchParams
  const search = typeof sp?.search === "string" ? sp.search : ""
  const category = typeof sp?.category === "string" ? sp.category : ""
  const sort = sp?.sort === "oldest" ? "oldest" : "newest"
  const incomeSourceParam = typeof sp?.incomeSource === "string" ? sp.incomeSource : ""
  const initialIncomeSource = incomeSourceParam
    ? incomeSourceParam.split(",").map((s) => s.trim()).filter(Boolean)
    : []
  const initialProfitable = sp?.profitable === "true"

  const [products, categoriesList] = await Promise.all([
    getProducts(locale, { search, category, sort }),
    getCategories(locale),
  ])

  const incomeSources = getIncomeSourcesFromProducts(products)

  return (
    <BrowseListingView
      products={products}
      categories={categoriesList}
      incomeSources={incomeSources}
      locale={locale}
      initialSearch={search}
      initialCategory={category}
      initialIncomeSource={initialIncomeSource}
      initialProfitable={initialProfitable}
      initialSort={sort}
    />
  )
}
