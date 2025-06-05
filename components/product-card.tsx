"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore()
  const isProductFavorite = isFavorite(product.id)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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

  const addToCartHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product)
    toast({
      title: "Додано до кошика",
      description: `${product.name} додано до кошика`,
    })
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full"
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isProductFavorite ? "fill-primary text-primary" : "")} />
            <span className="sr-only">Add to favorites</span>
          </Button>
          {product.isNew && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              Нове
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-2 min-h-[48px]">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-lg font-bold">{product.price} грн</div>
            {product.oldPrice && (
              <div className="text-sm text-muted-foreground line-through">{product.oldPrice} грн</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={addToCartHandler}>
            Додати до кошика
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
