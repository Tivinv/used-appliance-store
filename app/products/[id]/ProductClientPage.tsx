"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card"
import type { Product } from "@/types/product"
import ProductActions from "@/components/product-actions"

interface ProductPageProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductClientPage({ product, relatedProducts }: ProductPageProps) {
  return (
    <div className="container py-8">
      <Link href="/products" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад до всіх товарів
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-contain rounded-lg border"
            priority
          />
          {product.isNew && (
            <Badge className="absolute top-4 left-4" variant="secondary">
              Нове
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">Код товару: {product.id}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">{product.price} грн</div>
            {product.oldPrice && (
              <div className="text-xl text-muted-foreground line-through">{product.oldPrice} грн</div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="text-green-600 border-green-600">
              В наявності
            </Badge>
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>Доставка по Україні</span>
            </div>
          </div>

          <ProductActions product={product} />

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Опис</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4 mt-4">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <div className="space-y-2">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 py-2 border-b">
                    <div className="font-medium">{spec.name}</div>
                    <div>{spec.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="space-y-4 mt-4">
              <p>
                Доставка здійснюється по всій Україні через Нову Пошту або Укрпошту. Також можливий самовивіз зі складу
                за адресою: м. Баранівка, 1-й провулок Софіївський, 26а.
              </p>
              <p>
                Для уточнення деталей доставки, будь ласка, зв'яжіться з нами за телефоном:
                <a href="tel:+380976601362" className="font-medium ml-1 hover:underline">
                  +380 (97) 660 13 62
                </a>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Схожі товари</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
