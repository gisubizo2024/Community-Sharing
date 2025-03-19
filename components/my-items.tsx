"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ItemCard } from "@/components/item-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus } from "lucide-react"
import { getUserItems } from "@/lib/items"
import type { Item } from "@/lib/types"

interface MyItemsProps {
  userId: string
}

export function MyItems({ userId }: MyItemsProps) {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getUserItems(userId)
        setItems(data)
      } catch (error) {
        console.error("Failed to load items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadItems()
  }, [userId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">No items shared yet</h3>
          <p className="mt-1 text-gray-500">Start sharing items with your community</p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/items/new">
                <Plus className="mr-2 h-4 w-4" />
                Share an Item
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const activeItems = items.filter((item) => !item.isArchived)
  const archivedItems = items.filter((item) => item.isArchived)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Shared Items</h2>
        <Button asChild>
          <Link href="/items/new">
            <Plus className="mr-2 h-4 w-4" />
            Share New Item
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({activeItems.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archivedItems.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

