import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Euro } from "lucide-react"
import AdminProductList from "@/components/admin/product-list"
import AdminOrderList from "@/components/admin/order-list"

export default function AdminDashboard() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Адмін панель</h1>
        <div className="flex gap-2">
          <Link href="/admin/currency">
            <Button variant="outline">
              <Euro className="h-4 w-4 mr-2" />
              Курс валют
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Додати товар
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="products">Товари</TabsTrigger>
          <TabsTrigger value="orders">Замовлення</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <AdminProductList />
        </TabsContent>

        <TabsContent value="orders">
          <AdminOrderList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
