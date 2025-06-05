import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import CategoryList from "@/components/category-list"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center mx-auto max-w-3xl">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Якісна б/у техніка з Німеччини</h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Широкий вибір побутової техніки та електроніки за доступними цінами
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link href="/products">
                <Button size="lg">Переглянути товари</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Контакти
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Категорії товарів</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium">
              Всі категорії <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CategoryList />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Популярні товари</h2>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium">
              Всі товари <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Contact Section */}
      <section className="container px-4 md:px-6 py-8 bg-muted rounded-lg">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Наші контакти</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <p>м. Баранівка, 1-й провулок Софіївський, 26а</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="tel:+380976601362" className="hover:underline">
                  +380 (97) 660 13 62 - Леся
                </a>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Координати: 50.2991780, 27.6800604</p>
            </div>
            <Link href="/contact">
              <Button>Детальніше</Button>
            </Link>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.1544040918873!2d27.677871776992247!3d50.29917797159063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNTDCsDE3JzU3LjAiTiAyN8KwNDAnNDguMCJF!5e0!3m2!1suk!2sua!4v1621436289012!5m2!1suk!2sua&markers=50.2991780,27.6800604"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
