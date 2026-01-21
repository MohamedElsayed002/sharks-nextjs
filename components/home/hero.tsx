"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const searchSchema = z.object({
  query: z.string().min(2, "Please enter at least 2 characters"),
})

type SearchForm = z.infer<typeof searchSchema>

const categories = [
  "All",
  "Websites",
  "SaaS",
  "E-commerce",
  "Apps",
  "Channels / Accounts",
  "Domains",
  "Other",
]

export const Hero = () => {
  const [activeCategory, setActiveCategory] = useState("SaaS")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  })

  const onSubmit = (data: SearchForm) => {
    console.log("Search:", data.query, "Category:", activeCategory)
  }

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center px-4 pt-24 text-center"
    >
      {/* Heading */}
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
        Buy, Sell, and Invest in <br />
        <span className="block">Profitable Online Businesses</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-2xl text-muted-foreground">
        The most trusted marketplace for verified digital assets in the Middle East
      </p>

      {/* Search */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 w-full max-w-xl"
      >
        <div className="relative">
          <Input
            placeholder="Search for SaaS, E-commerce, Content websites..."
            {...register("query")}
            className="h-12 rounded-full px-5"
          />
          <Button
            type="submit"
            className="absolute right-1 top-1 h-10 rounded-full px-6"
          >
            Search
          </Button>
        </div>

        {errors.query && (
          <p className="mt-2 text-sm text-red-500">
            {errors.query.message}
          </p>
        )}
      </form>

      {/* Categories */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition
                ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
            >
              {category}
            </button>
          )
        })}
      </div>
    </section>
  )
}
