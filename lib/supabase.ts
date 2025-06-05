import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Product {
  id: string
  name: string
  description: string
  price: number
  old_price?: number
  price_eur?: number
  category: string
  image_url?: string
  is_new: boolean
  created_at: string
  updated_at: string
}

export interface ProductSpecification {
  id: string
  product_id: string
  name: string
  value: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  delivery_address: string
  notes?: string
  total_amount: number
  status: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  product_name: string
  quantity: number
  price: number
}

export interface Setting {
  id: string
  key: string
  value: string
  updated_at: string
}
