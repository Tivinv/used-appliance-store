"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Euro, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import { Switch } from "@/components/ui/switch"

export default function CurrencyPage() {
  const [tempRate, setTempRate] = useState(41)
  const [isLoading, setIsLoading] = useState(false)
  const [recalculatePrices, setRecalculatePrices] = useState(false)
  const { toast } = useToast()
  const { exchangeRate, setExchangeRate, products, updateProduct } = useStore()

  useEffect(() => {
    setTempRate(exchangeRate)
  }, [exchangeRate])

  const handleSave = () => {
    setIsLoading(true)

    setTimeout(() => {
      // Зберігаємо новий курс
      setExchangeRate(tempRate)

      // Якщо увімкнено перерахунок цін
      if (recalculatePrices) {
        // Перераховуємо ціни для всіх товарів
        products.forEach((product) => {
          // Використовуємо збережену ціну в євро, якщо вона є
          if (product.priceEur) {
            const newPriceUah = Math.round(product.priceEur * tempRate)

            let oldPriceUah = undefined
            if (product.oldPrice && product.priceEur) {
              // Якщо є стара ціна, припускаємо, що вона на ~15% вища
              const oldPriceEur = Math.round(product.priceEur * 1.15)
              oldPriceUah = Math.round(oldPriceEur * tempRate)
            }

            updateProduct(product.id, {
              price: newPriceUah,
              oldPrice: oldPriceUah,
            })
          }
        })

        toast({
          title: "Ціни перераховано",
          description: `Всі ціни товарів оновлено згідно з новим курсом: 1 EUR = ${tempRate} UAH`,
        })
      }

      toast({
        title: "Курс оновлено",
        description: `Новий курс: 1 EUR = ${tempRate} UAH`,
      })

      setIsLoading(false)
    }, 500)
  }

  const convertEurToUah = (eurAmount: number) => {
    return Math.round(eurAmount * tempRate)
  }

  return (
    <div className="container py-8">
      <Link href="/admin" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад до адмін панелі
      </Link>

      <h1 className="text-3xl font-bold mb-6">Налаштування курсу валют</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5" />
              Курс EUR → UAH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Курс (1 EUR = ? UAH)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                min="1"
                value={tempRate}
                onChange={(e) => setTempRate(Number(e.target.value))}
                placeholder="41.00"
              />
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Switch id="recalculate" checked={recalculatePrices} onCheckedChange={setRecalculatePrices} />
              <Label htmlFor="recalculate" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Перерахувати ціни всіх товарів
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Увімкніть цю опцію, щоб автоматично перерахувати ціни всіх товарів згідно з новим курсом.
            </p>

            <Button onClick={handleSave} disabled={isLoading} className="w-full">
              {isLoading ? "Збереження..." : "Зберегти курс"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Приклади конвертації</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>100 EUR</span>
              <span className="font-medium">{convertEurToUah(100)} UAH</span>
            </div>
            <div className="flex justify-between">
              <span>250 EUR</span>
              <span className="font-medium">{convertEurToUah(250)} UAH</span>
            </div>
            <div className="flex justify-between">
              <span>500 EUR</span>
              <span className="font-medium">{convertEurToUah(500)} UAH</span>
            </div>
            <div className="flex justify-between">
              <span>1000 EUR</span>
              <span className="font-medium">{convertEurToUah(1000)} UAH</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
