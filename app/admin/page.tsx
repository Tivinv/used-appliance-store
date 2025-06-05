"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, LogOut } from "lucide-react"
import AdminDashboard from "./admin-dashboard"

const ADMIN_PASSWORD = "vLixVX7K63et6h!p!G9gpz"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Перевіряємо, чи користувач вже авторизований
    const authStatus = localStorage.getItem("admin-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Простий setTimeout для імітації завантаження
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("admin-auth", "authenticated")
        setIsAuthenticated(true)
        setPassword("")
      } else {
        setError("Невірний пароль")
      }
      setIsLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
    setPassword("")
    setError("")
  }

  if (isAuthenticated) {
    return (
      <div>
        <div className="container py-4">
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Вийти
            </Button>
          </div>
        </div>
        <AdminDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Вхід в адмін панель</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введіть пароль"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Lock className="mr-2 h-4 w-4 animate-spin" />
                  Вхід...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Увійти
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
