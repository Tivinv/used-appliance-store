import type { Metadata } from "next"
import { MapPin, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Контакти | Б/У техніка з Німеччини",
  description: "Зв'яжіться з нами для отримання додаткової інформації про б/у техніку з Німеччини",
}

export default function ContactPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Контакти</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Наші контактні дані</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Адреса:</p>
                  <p>м. Баранівка, 1-й провулок Софіївський, 26а</p>
                  <p className="text-sm text-muted-foreground mt-1">Координати: 50.2991780, 27.6800604</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Телефон:</p>
                  <a href="tel:+380976601362" className="hover:underline">
                    +380 (97) 660 13 62 - Леся
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Графік роботи:</p>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб: 9:00 - 15:00</p>
                  <p>Нд: Вихідний</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[400px] md:h-full rounded-lg overflow-hidden border">
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
    </div>
  )
}
