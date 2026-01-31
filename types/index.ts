export interface ProductDetail {
    _id: string
    lang: string
    title: string
    slug: string
    description: string
    createdAt: string
    updatedAt: string
  }
  


  export interface Product {
    _id: string
    details: ProductDetail[]
    owner: string
    category: string
    imageUrl?: string
    isProfitable?: boolean
    averageMonthlyRevenue?: number
    averageMonthlyExpenses?: number
    netProfit?: number
    incomeSources?: string[]
    platformVerificationRequested?: boolean
    verificationLevel?: string
    revenueProofs?: { fileUrl: string; fileId: string; fileType: string; source: string; _id: string }[]
    createdAt: string
    updatedAt: string
  }

  export interface SingleServiceUser {
    _id: string
    details: ProductDetail[]
    owner: User
    category: string
    imageUrl?: string
    isProfitable?: boolean
    averageMonthlyRevenue?: number
    averageMonthlyExpenses?: number
    netProfit?: number
    incomeSources?: string[]
    platformVerificationRequested?: boolean
    verificationLevel?: string
    revenueProofs?: { fileUrl: string; fileId: string; fileType: string; source: string; _id: string }[]
    createdAt: string
    updatedAt: string
  }


  
  export type ProductFilters = {
    search?: string
    category?: string
    sort?: "newest" | "oldest"
  }
  