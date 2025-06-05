"use client"

import ProductCard from "@/components/product-card"
import { useStore } from "@/lib/store"

export default function FeaturedProducts() {
  const { getProducts } = useStore()
  const featuredProducts = getProducts().slice(0, 4)

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
