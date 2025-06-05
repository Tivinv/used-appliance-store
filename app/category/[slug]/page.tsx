"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useStore } from "@/lib/store"
import ProductCard from "@/components/product-card"
import { getCategories } from "@/lib/products"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { getProducts } = useStore()
  const allProducts = getProducts()

  // Фільтруємо товари за категорією
  const categoryProducts = allProducts.filter((product) => product.category === slug)

  // Знаходимо назву категорії
  const categories = getCategories()
  const category = categories.find((cat) => cat.slug === slug)
  const categoryName = category ? category.name : slug

  return (
    <div className="container py-8">
      <Link href="/" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад на головну
      </Link>

      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Товари не знайдено</h2>
          <p className="text-muted-foreground">У цій категорії поки немає товарів</p>
        </div>
      )}
    </div>
  )
}
