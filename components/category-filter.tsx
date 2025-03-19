"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

const categories = [
  "All",
  "Tools",
  "Kitchen",
  "Electronics",
  "Books",
  "Sports",
  "Garden",
  "Clothing",
  "Furniture",
  "Skills",
  "Other",
]

interface CategoryFilterProps {
  defaultValue?: string
}

export function CategoryFilter({ defaultValue = "" }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [category, setCategory] = useState(defaultValue || "All")

  useEffect(() => {
    setCategory(defaultValue || "All")
  }, [defaultValue])

  const handleCategoryChange = (value: string) => {
    setCategory(value)

    const params = new URLSearchParams(searchParams)
    if (value && value !== "All") {
      params.set("category", value)
    } else {
      params.delete("category")
    }

    router.push(`/items?${params.toString()}`)
  }

  return (
    <Select value={category} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

