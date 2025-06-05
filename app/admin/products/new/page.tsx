"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Euro, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { exchangeRate, addProduct } = useStore()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    priceEur: "",
    oldPriceEur: "",
    description: "",
    isNew: false,
  })

  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([{ name: "", value: "" }])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSpecificationChange = (index: number, field: "name" | "value", value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }])
  }

  const removeSpecification = (index: number) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((_, i) => i !== index))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const convertToUah = (eurAmount: string) => {
    if (!eurAmount) return 0
    return Math.round(Number(eurAmount) * exchangeRate)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Фільтруємо порожні характеристики
      const validSpecs = specifications.filter((spec) => spec.name.trim() && spec.value.trim())

      const productData = {
        name: formData.name,
        description: formData.description,
        price: convertToUah(formData.priceEur),
        oldPrice: formData.oldPriceEur ? convertToUah(formData.oldPriceEur) : undefined,
        category: formData.category,
        image: selectedImage || "/placeholder.svg?height=400&width=400",
        isNew: formData.isNew,
        specifications: validSpecs,
        priceEur: Number(formData.priceEur), // Зберігаємо ціну в євро
      }

      addProduct(productData)

      toast({
        title: "Товар додано",
        description: `${formData.name} додано з ціною ${convertToUah(formData.priceEur)} грн (${formData.priceEur} EUR)`,
      })

      router.push("/admin")
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося додати товар",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <Link href="/admin" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад до адмін панелі
      </Link>

      <h1 className="text-3xl font-bold mb-6">Додати новий товар</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Основна інформація</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Назва товару</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введіть назву товару"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категорія</Label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Виберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="холодильники">Холодильники</SelectItem>
                    <SelectItem value="морозильні-камери">Морозильні камери</SelectItem>
                    <SelectItem value="пральні-машинки">Пральні машинки</SelectItem>
                    <SelectItem value="посудомийні-машинки">Посудомийні машинки</SelectItem>
                    <SelectItem value="електро-плити">Електро плити</SelectItem>
                    <SelectItem value="газові-плити">Газові плити</SelectItem>
                    <SelectItem value="мікрохвільовки">Мікрохвільовки</SelectItem>
                    <SelectItem value="духові-шафи">Духові шафи</SelectItem>
                    <SelectItem value="пилососи">Пилососи</SelectItem>
                    <SelectItem value="робот-пилососи">Робот-пилососи</SelectItem>
                    <SelectItem value="праски">Праски</SelectItem>
                    <SelectItem value="парогенератори">Парогенератори</SelectItem>
                    <SelectItem value="велосипеди">Велосипеди</SelectItem>
                    <SelectItem value="електро-велосипеди">Електро велосипеди</SelectItem>
                    <SelectItem value="електро-самокати">Електро самокати</SelectItem>
                    <SelectItem value="компютерні-крісла">Комп'ютерні крісла</SelectItem>
                    <SelectItem value="швейні-машинки">Швейні машинки</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceEur" className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Ціна (EUR)
                  </Label>
                  <Input
                    id="priceEur"
                    name="priceEur"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.priceEur}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                  {formData.priceEur && (
                    <p className="text-sm text-muted-foreground">= {convertToUah(formData.priceEur)} грн</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oldPriceEur" className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Стара ціна (EUR)
                  </Label>
                  <Input
                    id="oldPriceEur"
                    name="oldPriceEur"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.oldPriceEur}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                  {formData.oldPriceEur && (
                    <p className="text-sm text-muted-foreground">= {convertToUah(formData.oldPriceEur)} грн</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <Label htmlFor="isNew">Новий товар</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Опис товару</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Введіть детальний опис товару"
                  className="min-h-[120px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Фото товару</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedImage ? (
                    <div className="relative">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground text-center">
                        Натисніть для вибору фото або перетягніть сюди
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    {selectedImage ? "Змінити фото" : "Вибрати фото"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Характеристики
                  <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                    <Plus className="h-4 w-4 mr-1" />
                    Додати
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Назва"
                        value={spec.name}
                        onChange={(e) => handleSpecificationChange(index, "name", e.target.value)}
                      />
                      <Input
                        placeholder="Значення"
                        value={spec.value}
                        onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                      />
                      {specifications.length > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => removeSpecification(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Скасувати
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Збереження..." : "Зберегти товар"}
          </Button>
        </div>
      </form>
    </div>
  )
}
