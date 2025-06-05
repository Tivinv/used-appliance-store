"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface CheckoutFormProps {
  total: number
  onClose: () => void
}

export default function CheckoutForm({ total, onClose }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartItems, clearCart, addOrder } = useStore()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Створюємо замовлення
      const orderData = {
        customer: formData,
        items: cartItems,
        total,
        orderDate: new Date().toISOString(),
      }

      // Додаємо замовлення до store
      addOrder(orderData)

      // Симуляція відправки замовлення
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Очищуємо корзину
      clearCart()

      toast({
        title: "Замовлення оформлено!",
        description: `Ваше замовлення на суму ${total} грн прийнято. Ми зв'яжемося з вами найближчим часом.`,
      })

      onClose()
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося оформити замовлення. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Оформлення замовлення</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ім'я та прізвище *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введіть ваше ім'я"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+380 XX XXX XX XX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адреса доставки *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Введіть адресу доставки"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Примітки</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Додаткові побажання до замовлення"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>До сплати:</span>
              <span>{total} грн</span>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Скасувати
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Оформлення..." : "Оформити"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
