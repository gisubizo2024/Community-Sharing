"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Loader2, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { getUserConversations } from "@/lib/messages"
import type { Conversation, Message } from "@/lib/types"

interface MyMessagesProps {
  userId: string
}

export function MyMessages({ userId }: MyMessagesProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadConversations() {
      try {
        const data = await getUserConversations(userId)
        setConversations(data)
        if (data.length > 0) {
          setActiveConversation(data[0].id)
        }
      } catch (error) {
        console.error("Failed to load conversations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConversations()
  }, [userId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeConversation) return

    // In a real app, this would send the message to the API
    console.log("Sending message:", newMessage, "to conversation:", activeConversation)
    setNewMessage("")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
          <p className="mt-1 text-gray-500">When you message someone about an item, it will appear here</p>
        </CardContent>
      </Card>
    )
  }

  const currentConversation = conversations.find((c) => c.id === activeConversation)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
      <div className="md:col-span-1 border rounded-lg overflow-hidden">
        <div className="p-3 border-b bg-muted/50">
          <h3 className="font-medium">Conversations</h3>
        </div>
        <div className="overflow-y-auto h-[calc(600px-3rem)]">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={`w-full text-left p-3 flex items-start gap-3 hover:bg-muted/50 ${
                conversation.id === activeConversation ? "bg-muted/50" : ""
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <Avatar>
                <AvatarImage src={conversation.participant.avatarUrl} alt={conversation.participant.name} />
                <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">{conversation.participant.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.lastMessageAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
        {currentConversation ? (
          <>
            <div className="p-3 border-b bg-muted/50 flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={currentConversation.participant.avatarUrl}
                  alt={currentConversation.participant.name}
                />
                <AvatarFallback>{currentConversation.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentConversation.participant.name}</p>
                {currentConversation.itemTitle && (
                  <p className="text-xs text-muted-foreground">Re: {currentConversation.itemTitle}</p>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation.messages.map((message) => (
                <MessageBubble key={message.id} message={message} isOwn={message.senderId === userId} />
              ))}
            </div>

            <div className="p-3 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  )
}

