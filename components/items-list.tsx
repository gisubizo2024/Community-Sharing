import { ItemCard } from "@/components/item-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getFilteredItems } from "@/lib/items"

interface ItemsListProps {
  query: string
  category: string
}

export async function ItemsList({ query, category }: ItemsListProps) {
  const items = await getFilteredItems(query, category)

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-gray-500">
            {query || category
              ? "Try adjusting your search or filters"
              : "Be the first to share something with your community!"}
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/items/new">Share an Item</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

