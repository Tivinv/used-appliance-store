"use client"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

interface ProductActionsProps {
  product: Product
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { toast } = useToast()
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore()
  const isProductFavorite = isFavorite(product.id)

  const addToCartHandler = () => {
    addToCart(product)
    toast({
      title: "Додано до кошика",
      description: `${product.name} додано до кошика`,
    })
  }

  const toggleFavorites = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id)
      toast({
        title: "Видалено з обраного",
        description: `${product.name} видалено з обраного`,
      })
    } else {
      addToFavorites(product)
      toast({
        title: "Додано до обраного",
        description: `${product.name} додано до обраного`,
      })
    }
  }

  return (
    <div className="space-y-2">
      <Button className="w-full" size="lg" onClick={addToCartHandler}>
        Додати до кошика
      </Button>
      <Button variant="outline" className="w-full" size="lg" onClick={toggleFavorites}>
        {isProductFavorite ? "Видалити з обраного" : "Додати до обраного"}
      </Button>
    </div>
  )
}
