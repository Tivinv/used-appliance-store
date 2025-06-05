"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useStore } from "@/lib/store"
import CheckoutForm from "./checkout-form"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useStore()
  const [showCheckout, setShowCheckout] = useState(false)

  const subtotal = getCartTotal()
  const delivery = cartItems.length > 0 ? 400 : 0
  const total = subtotal + delivery

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  return (
    <div className="container py-8">
      <Link href="/products" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Продовжити покупки
      </Link>

      <h1 className="text-3xl font-bold mb-6">Кошик</h1>

      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          <div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <div className="w-[100px] h-[100px] relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                      {item.name}
                    </Link>
                    <div className="text-lg font-bold">{item.price} грн</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Зменшити</span>
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                        className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Збільшити</span>
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Видалити
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Підсумок замовлення</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Сума</span>
                    <span>{subtotal} грн</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span>{delivery} грн</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Всього</span>
                    <span>{total} грн</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Оформити замовлення
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <CheckoutForm total={total} onClose={() => setShowCheckout(false)} />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Ваш кошик порожній</h2>
          <p className="text-muted-foreground mb-6">Додайте товари до кошика, щоб продовжити покупки</p>
          <Link href="/products">
            <Button>Перейти до товарів</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
