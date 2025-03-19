import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { MapPin } from "lucide-react"
import type { Item } from "@/lib/types"

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/items/${item.id}`}>
        <div className="relative aspect-square">
          <Image
            src={item.imageUrl || "/placeholder.svg?height=400&width=400"}
            alt={item.title}
            fill
            className="object-cover"
          />
          <Badge variant="secondary" className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm">
            {item.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{item.location}</span>
          </div>
          <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">{item.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.owner.avatarUrl} alt={item.owner.name} />
              <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{item.owner.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}

