import type { Product } from "@/types/product"
import { useStore } from "@/lib/store"

export function getFeaturedProducts(): Product[] {
  // Get products from store instead of static data
  if (typeof window !== "undefined") {
    const store = useStore.getState()
    return store.getProducts().slice(0, 4)
  }
  return []
}

export function getAllProducts(): Product[] {
  if (typeof window !== "undefined") {
    const store = useStore.getState()
    return store.getProducts()
  }
  return []
}

export function getProductById(id: string): Product | undefined {
  if (typeof window !== "undefined") {
    const store = useStore.getState()
    return store.getProductById(id)
  }
  return undefined
}

export function getRelatedProducts(category: string): Product[] {
  if (typeof window !== "undefined") {
    const store = useStore.getState()
    return store
      .getProducts()
      .filter((product) => product.category === category)
      .slice(0, 4)
  }
  return []
}

export function getCategories() {
  return [
    { name: "Холодильники", slug: "холодильники" },
    { name: "Морозильні камери", slug: "морозильні-камери" },
    { name: "Пральні машинки", slug: "пральні-машинки" },
    { name: "Посудомийні машинки", slug: "посудомийні-машинки" },
    { name: "Електро плити", slug: "електро-плити" },
    { name: "Газові плити", slug: "газові-плити" },
    { name: "Мікрохвільовки", slug: "мікрохвільовки" },
    { name: "Духові шафи", slug: "духові-шафи" },
    { name: "Пилососи", slug: "пилососи" },
    { name: "Робот-пилососи", slug: "робот-пилососи" },
    { name: "Праски", slug: "праски" },
    { name: "Парогенератори", slug: "парогенератори" },
    { name: "Велосипеди", slug: "велосипеди" },
    { name: "Електро велосипеди", slug: "електро-велосипеди" },
    { name: "Електро самокати", slug: "електро-самокати" },
    { name: "Комп'ютерні крісла", slug: "компютерні-крісла" },
    { name: "Швейні машинки", slug: "швейні-машинки" },
  ]
}
