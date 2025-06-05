import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function DatabaseComparison() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Порівняння баз даних</CardTitle>
        <CardDescription>Порівняння популярних хмарних баз даних для вашого проекту</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Рекомендації щодо вибору бази даних для вашого проекту</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Характеристика</TableHead>
              <TableHead>Supabase</TableHead>
              <TableHead>Firebase</TableHead>
              <TableHead>PlanetScale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Тип бази даних</TableCell>
              <TableCell>PostgreSQL</TableCell>
              <TableCell>NoSQL (Firestore)</TableCell>
              <TableCell>MySQL</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Безкоштовне сховище</TableCell>
              <TableCell>500MB</TableCell>
              <TableCell>1GB</TableCell>
              <TableCell>5GB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Аутентифікація</TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <X className="h-5 w-5 text-red-500 mx-auto" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Зберігання файлів</TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <X className="h-5 w-5 text-red-500 mx-auto" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SQL запити</TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <X className="h-5 w-5 text-red-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Реальний час</TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <X className="h-5 w-5 text-red-500 mx-auto" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Інтеграція з Next.js</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-500">Відмінна</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-500">Відмінна</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-yellow-500">Добра</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Складність налаштування</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-500">Низька</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-500">Низька</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-yellow-500">Середня</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Рекомендація для проекту</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-500">Найкращий вибір</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-yellow-500">Добрий вибір</Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-yellow-500">Добрий вибір</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
