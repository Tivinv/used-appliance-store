export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  category: string
  image: string
  isNew?: boolean
  specifications?: { name: string; value: string }[]
  priceEur?: number // Додаємо поле для ціни в євро
}
