import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageForm } from "@/components/message-form"
import { getItemById } from "@/lib/items"
import { formatDistanceToNow } from "date-fns"
import { MapPin, Calendar, ArrowLeft } from "lucide-react"

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItemById(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/items">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to items
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-96">
              <Image
                src={item.imageUrl || "/placeholder.svg?height=600&width=800"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-sm">
                  {item.category}
                </Badge>
                <span className="text-sm text-gray-500">
                  Posted {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{item.location}</span>
                {item.availableUntil && (
                  <>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      Available until {new Date(item.availableUntil).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.owner.avatarUrl} alt={item.owner.name} />
                  <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.owner.name}</h3>
                  <p className="text-sm text-gray-500">
                    Member since {new Date(item.owner.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <MessageForm recipientId={item.owner.id} itemId={item.id} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sharing Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Always meet in a public place for exchanges</li>
                <li>• Inspect items before borrowing</li>
                <li>• Return items in the same condition</li>
                <li>• Communicate clearly about timeframes</li>
                <li>• Leave feedback after your exchange</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

