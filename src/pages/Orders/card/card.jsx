
import { Edit, Trash2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Cards(el) {
  const handleEdit = () => {
    console.log("Edit category")
  }

  const handleDelete = () => {
    console.log("Delete category")
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <Image
          src="/placeholder.svg?height=200&width=300"
          alt="Electronics Category"
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit category</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm text-red-600 hover:text-red-700"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete category</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-center">Electronics</h3>
      </CardContent>
    </Card>
  )
}
