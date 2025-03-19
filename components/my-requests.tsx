"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { getUserRequests } from "@/lib/requests"
import type { Request } from "@/lib/types"

interface MyRequestsProps {
  userId: string
}

export function MyRequests({ userId }: MyRequestsProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getUserRequests(userId)
        setRequests(data)
      } catch (error) {
        console.error("Failed to load requests:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRequests()
  }, [userId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">No requests yet</h3>
          <p className="mt-1 text-gray-500">You haven't made or received any requests</p>
          <div className="mt-6">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Request
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const incomingRequests = requests.filter((req) => req.recipientId === userId)
  const outgoingRequests = requests.filter((req) => req.senderId === userId)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Requests</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Request
        </Button>
      </div>

      <Tabs defaultValue="incoming">
        <TabsList>
          <TabsTrigger value="incoming">Incoming ({incomingRequests.length})</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing ({outgoingRequests.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming" className="mt-6">
          <div className="space-y-4">
            {incomingRequests.map((request) => (
              <RequestCard key={request.id} request={request} type="incoming" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="outgoing" className="mt-6">
          <div className="space-y-4">
            {outgoingRequests.map((request) => (
              <RequestCard key={request.id} request={request} type="outgoing" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface RequestCardProps {
  request: Request
  type: "incoming" | "outgoing"
}

function RequestCard({ request, type }: RequestCardProps) {
  const user = type === "incoming" ? request.sender : request.recipient

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                </p>
              </div>
              <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Item: {request.item.title}</p>
              <p className="text-sm mt-1">{request.message}</p>
            </div>
            {type === "incoming" && request.status === "pending" && (
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="default">
                  Accept
                </Button>
                <Button size="sm" variant="outline">
                  Decline
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "accepted":
      return "success"
    case "declined":
      return "destructive"
    case "completed":
      return "default"
    default:
      return "secondary"
  }
}

