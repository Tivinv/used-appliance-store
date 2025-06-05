"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Package, User, MapPin, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  const { getOrders } = useStore()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const orders = getOrders()
    const foundOrder = orders.find((o) => o.id === params.id)
    setOrder(foundOrder)
  }, [params.id, getOrders])

  if (!order) {
    notFound()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Виконано</Badge>
      case "processing":
        return <Badge className="bg-blue-500">В обробці</Badge>
      case "shipped":
        return <Badge className="bg-orange-500">Відправлено</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Очікує</Badge>
      default:
        return <Badge>Невідомо</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container py-8">
      <Link href="/admin" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад до адмін панелі
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Замовлення {order.id}</h1>
        {getStatusBadge(order.status)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Інформація про клієнта
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{order.customer.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${order.customer.phone}`} className="hover:underline">
                {order.customer.phone}
              </a>
            </div>

            {order.customer.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${order.customer.email}`} className="hover:underline">
                  {order.customer.email}
                </a>
              </div>
            )}

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <p>{order.customer.address}</p>
            </div>

            {order.customer.notes && (
              <div>
                <p className="text-sm font-medium mb-1">Примітки:</p>
                <p className="text-sm text-muted-foreground">{order.customer.notes}</p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium mb-1">Дата замовлення:</p>
              <p className="text-sm text-muted-foreground">{formatDate(order.orderDate)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Товари в замовленні
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.price} грн × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">{item.price * item.quantity} грн</p>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center font-bold text-lg">
                <span>Загальна сума:</span>
                <span>{order.total} грн</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
