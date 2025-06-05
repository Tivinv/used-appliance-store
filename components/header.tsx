"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Heart, Menu, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartItemsCount, favoriteItems } = useStore()

  const cartItemsCount = getCartItemsCount()
  const favoritesCount = favoriteItems.length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Б/У техніка з Німеччини</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Головна
          </Link>
          <Link
            href="/products"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === "/products" || pathname.startsWith("/products/") ? "text-foreground" : "text-foreground/60",
            )}
          >
            Всі товари
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === "/contact" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Контакти
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/favorites" className="relative">
            <Button variant="ghost" size="icon" aria-label="Обране">
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {favoritesCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Кошик">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="icon" aria-label="Адмін панель">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="grid gap-2">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 p-2",
                pathname === "/" ? "text-foreground bg-accent rounded-md" : "text-foreground/60",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Головна
            </Link>
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 p-2",
                pathname === "/products" || pathname.startsWith("/products/")
                  ? "text-foreground bg-accent rounded-md"
                  : "text-foreground/60",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Всі товари
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 p-2",
                pathname === "/contact" ? "text-foreground bg-accent rounded-md" : "text-foreground/60",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Контакти
            </Link>
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 p-2",
                pathname === "/admin" || pathname.startsWith("/admin/")
                  ? "text-foreground bg-accent rounded-md"
                  : "text-foreground/60",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Адмін панель
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
