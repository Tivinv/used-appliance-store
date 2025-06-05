import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import EditProductForm from "./edit-product-form"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Редагувати товар | Адмін панель",
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <EditProductForm product={product} />
}
