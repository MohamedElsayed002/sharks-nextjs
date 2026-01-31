import { getProducts, getCategories } from "@/actions"
import { BrowseListingView } from "@/components/browse-listing"

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BrowseListingPage(props: PageProps) {
  const { locale } = await props.params
  const sp = await props.searchParams
  const search = typeof sp?.search === "string" ? sp.search : ""
  const category = typeof sp?.category === "string" ? sp.category : ""
  const sort =
    sp?.sort === "oldest" ? "oldest" : "newest"

  const [products, categoriesList] = await Promise.all([
    getProducts(locale, { search, category, sort }),
    getCategories(locale),
  ])

  return (
    <BrowseListingView
      products={products}
      categories={categoriesList}
      locale={locale}
      initialSearch={search}
      initialCategory={category}
      initialSort={sort}
    />
  )
}
