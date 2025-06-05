import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import DatabaseComparison from "@/components/database-comparison"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DatabasePage() {
  return (
    <div className="container py-8">
      <Link href="/admin" className="flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" />
        Назад до адмін панелі
      </Link>

      <h1 className="text-3xl font-bold mb-6">Вибір бази даних</h1>

      <div className="grid gap-6">
        <DatabaseComparison />

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Supabase</CardTitle>
              <CardDescription>PostgreSQL + додаткові функції</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                <strong>Переваги для вашого проекту:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Повноцінна SQL база даних (PostgreSQL)</li>
                <li>Вбудована аутентифікація користувачів</li>
                <li>Зберігання файлів (для фото товарів)</li>
                <li>Реальний час для синхронізації кошика</li>
                <li>Легка інтеграція з Next.js</li>
                <li>Зручний інтерфейс адміністрування</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Рекомендація:</strong> Найкращий вибір для вашого проекту, особливо якщо вам потрібна
                аутентифікація та зберігання файлів в одному сервісі.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Firebase</CardTitle>
              <CardDescription>NoSQL + екосистема Google</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                <strong>Переваги для вашого проекту:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Більше безкоштовного сховища (1GB)</li>
                <li>Потужна аутентифікація</li>
                <li>Firebase Storage для зображень</li>
                <li>Реальний час для синхронізації даних</li>
                <li>Аналітика та моніторинг</li>
                <li>Хостинг для веб-додатків</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Рекомендація:</strong> Добрий вибір, якщо вам зручніше працювати з NoSQL та потрібна інтеграція
                з іншими сервісами Google.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PlanetScale</CardTitle>
              <CardDescription>MySQL як сервіс</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                <strong>Переваги для вашого проекту:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Найбільше безкоштовного сховища (5GB)</li>
                <li>Висока продуктивність</li>
                <li>Безсерверна MySQL база даних</li>
                <li>Гарна масштабованість</li>
                <li>Підтримка Prisma ORM</li>
                <li>Розгалуження бази даних (як Git)</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Рекомендація:</strong> Добрий вибір, якщо вам потрібна тільки реляційна база даних і ви плануєте
                використовувати окремі сервіси для аутентифікації та зберігання файлів.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
