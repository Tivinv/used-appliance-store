"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import { useStore } from "@/lib/store"

export default function ProductList() {
  const searchParams = useSearchParams()
  const { getProducts } = useStore()
  const allProducts = getProducts()

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Price filter
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= Number.parseInt(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number.parseInt(maxPrice))
    }

    // Category filter
    const categories = searchParams.get("categories")
    if (categories) {
      const categoryList = categories.split(",")
      filtered = filtered.filter((product) => categoryList.includes(product.category))
    }

    // Brand filter (based on product name for demo)
    const brands = searchParams.get("brands")
    if (brands) {
      const brandList = brands.split(",")
      filtered = filtered.filter((product) =>
        brandList.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase())),
      )
    }

    // Condition filter (for demo, we'll use isNew property)
    const conditions = searchParams.get("conditions")
    if (conditions) {
      const conditionList = conditions.split(",")
      if (conditionList.includes("excellent") && !conditionList.includes("good") && !conditionList.includes("fair")) {
        filtered = filtered.filter((product) => product.isNew === true)
      } else if (
        conditionList.includes("good") &&
        !conditionList.includes("excellent") &&
        !conditionList.includes("fair")
      ) {
        filtered = filtered.filter((product) => product.isNew === false)
      }
    }

    return filtered
  }, [allProducts, searchParams])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Товари не знайдено</h2>
        <p className="text-muted-foreground">Спробуйте змінити фільтри пошуку</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
