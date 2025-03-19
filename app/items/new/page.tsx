import { ItemForm } from "@/components/item-form"

export default function NewItemPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Share an Item</h1>
        <p className="mt-2 text-gray-600">List something you'd like to share with your community</p>
      </div>

      <ItemForm />
    </div>
  )
}

