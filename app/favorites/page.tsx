"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { useStore } from "@/lib/store"

export default function FavoritesPage() {
  const { favoriteItems } = useStore()

  return (
    <div className="container py-8">
      <Link href="/products" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Продовжити покупки
      </Link>

      <h1 className="text-3xl font-bold mb-6">Обране</h1>

      {favoriteItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">У вас немає обраних товарів</h2>
          <p className="text-muted-foreground mb-6">Додайте товари до обраного, щоб швидко знаходити їх пізніше</p>
          <Link href="/products">
            <Button>Перейти до товарів</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
