"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 30000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const categories = [
    { id: "холодильники", label: "Холодильники" },
    { id: "морозильні-камери", label: "Морозильні камери" },
    { id: "пральні-машинки", label: "Пральні машинки" },
    { id: "посудомийні-машинки", label: "Посудомийні машинки" },
    { id: "електро-плити", label: "Електро плити" },
    { id: "газові-плити", label: "Газові плити" },
    { id: "мікрохвильовки", label: "Мікрохвильовки" },
    { id: "духові-шафи", label: "Духові шафи" },
    { id: "пилососи", label: "Пилососи" },
    { id: "робот-пилососи", label: "Робот-пилососи" },
    { id: "праски", label: "Праски" },
    { id: "парогенератори", label: "Парогенератори" },
    { id: "велосипеди", label: "Велосипеди" },
    { id: "електро-велосипеди", label: "Електро велосипеди" },
    { id: "електро-самокати", label: "Електро самокати" },
    { id: "компютерні-крісла", label: "Комп'ютерні крісла" },
    { id: "швейні-машинки", label: "Швейні машинки" },
  ]

  const brands = [
    { id: "bosch", label: "Bosch" },
    { id: "siemens", label: "Siemens" },
    { id: "miele", label: "Miele" },
    { id: "aeg", label: "AEG" },
    { id: "liebherr", label: "Liebherr" },
    { id: "samsung", label: "Samsung" },
    { id: "lg", label: "LG" },
    { id: "philips", label: "Philips" },
    { id: "fischer", label: "Fischer" },
  ]

  const conditions = [
    { id: "excellent", label: "Відмінний" },
    { id: "good", label: "Добрий" },
    { id: "fair", label: "Задовільний" },
  ]

  // Load filters from URL on component mount
  useEffect(() => {
    if (isInitialized) return

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const categories = searchParams.get("categories")
    const brands = searchParams.get("brands")
    const conditions = searchParams.get("conditions")

    if (minPrice || maxPrice) {
      setPriceRange([minPrice ? Number.parseInt(minPrice) : 0, maxPrice ? Number.parseInt(maxPrice) : 30000])
    }

    if (categories) {
      setSelectedCategories(categories.split(","))
    }

    if (brands) {
      setSelectedBrands(brands.split(","))
    }

    if (conditions) {
      setSelectedConditions(conditions.split(","))
    }

    setIsInitialized(true)
  }, [searchParams, isInitialized])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const handleConditionChange = (conditionId: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, conditionId])
    } else {
      setSelectedConditions(selectedConditions.filter((id) => id !== conditionId))
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 30000) params.set("maxPrice", priceRange[1].toString())
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","))
    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","))
    if (selectedConditions.length > 0) params.set("conditions", selectedConditions.join(","))

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setPriceRange([0, 30000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedConditions([])
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Фільтри</h3>
        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
          Скинути всі фільтри
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "categories", "brands"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Ціна</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 30000]}
                max={30000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <span>{priceRange[0]} грн</span>
                <span>{priceRange[1]} грн</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Категорії</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Бренди</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>Стан</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition.id}`}
                    checked={selectedConditions.includes(condition.id)}
                    onCheckedChange={(checked) => handleConditionChange(condition.id, checked as boolean)}
                  />
                  <Label htmlFor={`condition-${condition.id}`}>{condition.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>
        Застосувати фільтри
      </Button>
    </div>
  )
}
