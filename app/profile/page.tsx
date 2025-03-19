import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileHeader } from "@/components/profile-header"
import { MyItems } from "@/components/my-items"
import { MyRequests } from "@/components/my-requests"
import { MyMessages } from "@/components/my-messages"
import { getCurrentUser } from "@/lib/auth"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProfileHeader user={user} />

      <div className="mt-8">
        <Tabs defaultValue="my-items">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="my-items">My Items</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="my-items" className="mt-6">
            <MyItems userId={user.id} />
          </TabsContent>
          <TabsContent value="requests" className="mt-6">
            <MyRequests userId={user.id} />
          </TabsContent>
          <TabsContent value="messages" className="mt-6">
            <MyMessages userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

