import type { Metadata } from "next"
import ProductList from "@/components/product-list"
import ProductFilters from "@/components/product-filters"

export const metadata: Metadata = {
  title: "Всі товари | Б/У техніка з Німеччини",
  description: "Перегляньте наш каталог б/у техніки з Німеччини",
}

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Всі товари</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <aside className="hidden md:block">
          <ProductFilters />
        </aside>

        <div>
          <ProductList />
        </div>
      </div>
    </div>
  )
}
