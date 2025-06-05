"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types/product"

interface CartItem extends Product {
  quantity: number
}

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    email: string
    address: string
    notes: string
  }
  items: CartItem[]
  total: number
  status: string
  orderDate: string
}

interface StoreState {
  // Cart
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number

  // Favorites
  favoriteItems: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean

  // Orders
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "status">) => void
  getOrders: () => Order[]

  // Products (now empty by default, will be loaded from Supabase)
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProducts: () => Product[]
  getProductById: (id: string) => Product | undefined

  // Exchange rate
  exchangeRate: number
  setExchangeRate: (rate: number) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],

      addToCart: (product) => {
        const { cartItems } = get()
        const existingItem = cartItems.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            cartItems: cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            cartItems: [...cartItems, { ...product, quantity: 1 }],
          })
        }
      },

      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }

        set({
          cartItems: get().cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ cartItems: [] })
      },

      getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getCartItemsCount: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0)
      },

      // Favorites state
      favoriteItems: [],

      addToFavorites: (product) => {
        const { favoriteItems } = get()
        if (!favoriteItems.find((item) => item.id === product.id)) {
          set({
            favoriteItems: [...favoriteItems, product],
          })
        }
      },

      removeFromFavorites: (productId) => {
        set({
          favoriteItems: get().favoriteItems.filter((item) => item.id !== productId),
        })
      },

      isFavorite: (productId) => {
        return get().favoriteItems.some((item) => item.id === productId)
      },

      // Orders state
      orders: [],

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          status: "pending",
        }

        set({
          orders: [...get().orders, newOrder],
        })
      },

      getOrders: () => {
        return get().orders
      },

      // Products state (empty by default, will be loaded from Supabase)
      products: [],

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `PROD-${Date.now()}`,
        }

        set({
          products: [...get().products, newProduct],
        })
      },

      updateProduct: (id, productData) => {
        set({
          products: get().products.map((product) => (product.id === id ? { ...product, ...productData } : product)),
        })
      },

      deleteProduct: (id) => {
        set({
          products: get().products.filter((product) => product.id !== id),
        })
      },

      getProducts: () => {
        return get().products
      },

      getProductById: (id) => {
        return get().products.find((product) => product.id === id)
      },

      // Exchange rate
      exchangeRate: 41,

      setExchangeRate: (rate) => {
        set({ exchangeRate: rate })
      },
    }),
    {
      name: "appliance-store",
      partialize: (state) => ({
        cartItems: state.cartItems,
        favoriteItems: state.favoriteItems,
        orders: state.orders,
        exchangeRate: state.exchangeRate,
        // Не зберігаємо products в localStorage, вони будуть завантажуватися з Supabase
      }),
    },
  ),
)
