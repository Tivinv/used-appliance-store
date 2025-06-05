"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types/product"

interface EditProductFormProps {
  product: Product
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Товар оновлено",
        description: "Зміни успішно збережено",
      })
      router.push("/admin")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <Link href="/admin" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад до адмін панелі
      </Link>

      <h1 className="text-3xl font-bold mb-6">Редагувати товар</h1>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Інформація про товар</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Назва товару</Label>
                <Input id="name" defaultValue={product.name} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категорія</Label>
                <Select defaultValue={product.category}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Виберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="холодильники">Холодильники</SelectItem>
                    <SelectItem value="пральні-машинки">Пральні машинки</SelectItem>
                    <SelectItem value="електро-велосипеди">Електро велосипеди</SelectItem>
                    {/* Додайте інші категорії */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Ціна (грн)</Label>
                <Input id="price" type="number" min="0" defaultValue={product.price} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oldPrice">Стара ціна (грн)</Label>
                <Input id="oldPrice" type="number" min="0" defaultValue={product.oldPrice || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Опис товару</Label>
              <Textarea id="description" defaultValue={product.description} className="min-h-[120px]" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
              Скасувати
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Збереження..." : "Зберегти зміни"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
