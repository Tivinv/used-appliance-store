import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Б/У техніка з Німеччини</h3>
            <p className="text-sm text-muted-foreground">Якісна б/у техніка з Німеччини за доступними цінами</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>м. Баранівка, 1-й провулок Софіївський, 26а</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <a href="tel:+380976601362" className="hover:underline">
                  +380 (97) 660 13 62 - Леся
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Навігація</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm hover:underline">
                Головна
              </Link>
              <Link href="/products" className="text-sm hover:underline">
                Всі товари
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Контакти
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Б/У техніка з Німеччини. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}
