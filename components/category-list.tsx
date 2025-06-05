import type React from "react"
import { getCategories } from "@/lib/products"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Refrigerator,
  Snowflake,
  WashingMachine,
  Utensils,
  ChefHat,
  Flame,
  Microwave,
  AirVent,
  Gamepad2,
  Shirt,
  Zap,
  Bike,
  Dumbbell,
} from "lucide-react"

export default function CategoryList() {
  const categories = getCategories()

  // Мапа іконок для категорій
  const categoryIcons: Record<string, React.ReactNode> = {
    холодильники: <Refrigerator className="h-6 w-6" />,
    "морозильні-камери": <Snowflake className="h-6 w-6" />,
    "пральні-машинки": <WashingMachine className="h-6 w-6" />,
    "посудомийні-машинки": <Utensils className="h-6 w-6" />,
    "електро-плити": <ChefHat className="h-6 w-6" />,
    "газові-плити": <Flame className="h-6 w-6" />,
    мікрохвільовки: <Microwave className="h-6 w-6" />,
    "духові-шафи": <ChefHat className="h-6 w-6" />,
    пилососи: <AirVent className="h-6 w-6" />,
    "робот-пилососи": <Gamepad2 className="h-6 w-6" />,
    праски: <Dumbbell className="h-6 w-6" />,
    парогенератори: <Zap className="h-6 w-6" />,
    велосипеди: <Bike className="h-6 w-6" />,
    "електро-велосипеди": <Bike className="h-6 w-6" />,
    "електро-самокати": <Bike className="h-6 w-6" />,
    "компютерні-крісла": <Gamepad2 className="h-6 w-6" />,
    "швейні-машинки": <Shirt className="h-6 w-6" />,
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <Card className="h-full transition-colors hover:border-primary">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-muted">
                {categoryIcons[category.slug] || <ChefHat className="h-6 w-6" />}
              </div>
              <h3 className="text-sm font-medium">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
