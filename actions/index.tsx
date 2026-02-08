"use server"

import { Product, ProductFilters } from "@/types"


export const getProducts = async (
  locale: string,
  filters?: ProductFilters
): Promise<Product[]> => {
  const lang = locale === "ar" ? "ar" : "en"
  const params = new URLSearchParams({ lang })
  if (filters?.search?.trim()) params.set("search", filters.search.trim())
  if (filters?.category?.trim()) params.set("category", filters.category.trim())
  const response = await fetch(
    `${process.env.BASE_URL}/services/get-all-products?${params.toString()}`,
    { cache: "no-store" }
  )
  const data = await response.json()
  const products: Product[] = Array.isArray(data) ? data : []
  const sort = filters?.sort ?? "newest"
  products.sort((a, b) => {
    const da = new Date(a.createdAt).getTime()
    const db = new Date(b.createdAt).getTime()
    return sort === "newest" ? db - da : da - db
  })
  return products
}

export const getCategories = async (locale: string): Promise<string[]> => {
  const products = await getProducts(locale, {})
  const set = new Set(products.map((p) => p.category).filter(Boolean))
  return Array.from(set).sort()
}

export const getSingleServiceUser = async (id: string) => {
  const product = await fetch(`${process.env.BASE_URL}/services/single-service-users/${id}`)
  const data = await product.json()
  return data
}

export const getPendingServices = async () => {
  const response = await fetch(`${process.env.BASE_URL}/services`)
  const data = await response.json()
  return data
}

export const getSingleReviewService = async (id: string) => {
  const response = await fetch(`${process.env.BASE_URL}/services/single-service/${id}`)
  const data = await response.json()
  return data
}

export const getVerifiedServices = async () => {
  const response = await fetch(`${process.env.BASE_URL}/services/verified-services`)
  const data = await response.json()
  return data
}

export const deleteService = async (id: string) => {
  const response = await fetch(`${process.env.BASE_URL}/services/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // TODO: TOKEN
    }
  })
  const data = await response.json()
  return data
}


export const getAllUsers = async () => {
  const response = await fetch(`${process.env.BASE_URL}/user/all-users`)
  const data = await response.json()
  return data
}

export const updateServiceStatus = async (id: string, verification: boolean) => {
  const response = await fetch(`${process.env.BASE_URL}/services/update-service-verification/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ verification })
  })

  const data = await response.json()
  return data
}