import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ItemCard } from "@/components/item-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { getRecentItems } from "@/lib/items"

export default async function Home() {
  const recentItems = await getRecentItems()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-primary py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Share. Connect. Thrive.
          </h1>
          <p className="mt-6 text-xl text-primary-foreground max-w-2xl mx-auto">
            Join your local community to share resources, skills, and tools. Reduce waste, save money, and build
            meaningful connections.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/items">Browse Items</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-white text-primary hover:bg-white/90"
            >
              <Link href="/items/new">Share Something</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recently Shared</h2>
            <p className="text-gray-600">Check out what people in your community are sharing</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar />
            <CategoryFilter />
          </div>
        </div>

        {recentItems.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <h3 className="text-lg font-medium text-gray-900">No items yet</h3>
              <p className="mt-1 text-gray-500">Be the first to share something with your community!</p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/items/new">Share an Item</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/items">View All Items</Link>
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to share resources within your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">List Your Items</h3>
              <p className="mt-2 text-gray-600">
                Share tools, equipment, books, or skills you're willing to lend or offer to your community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Connect</h3>
              <p className="mt-2 text-gray-600">
                Message other members to arrange borrowing or exchanging items and services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Build Trust</h3>
              <p className="mt-2 text-gray-600">
                Leave reviews and build your reputation in the community as you share and borrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

