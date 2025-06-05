import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/products"
import ProductClientPage from "./ProductClientPage"

interface ProductPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductById(params.id)

  if (!product) {
    return {
      title: "Товар не знайдено | Б/У техніка з Німеччини",
    }
  }

  return {
    title: `${product.name} | Б/У техніка з Німеччини`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.category)

  return <ProductClientPage product={product} relatedProducts={relatedProducts} />
}
