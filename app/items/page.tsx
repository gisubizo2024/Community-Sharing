import { Suspense } from "react"
import { ItemsList } from "@/components/items-list"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { ItemsListSkeleton } from "@/components/items-list-skeleton"

export default function ItemsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string }
}) {
  const query = searchParams.q || ""
  const category = searchParams.category || ""

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Browse Shared Items</h1>
        <p className="text-gray-600">Find resources, tools, and skills shared by your community</p>

        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <SearchBar defaultValue={query} />
          <CategoryFilter defaultValue={category} />
        </div>

        <Suspense fallback={<ItemsListSkeleton />}>
          <ItemsList query={query} category={category} />
        </Suspense>
      </div>
    </div>
  )
}

