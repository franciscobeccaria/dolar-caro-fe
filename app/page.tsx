import Image from "next/image"
import Link from "next/link"
import { ArrowRight, DollarSign, TrendingUp, Search } from "lucide-react"

import { Card } from "@/components/ui/card"

export default function Home() {
  // This would be fetched from an API in a real application
  const blueRate = 1250
  const priceDifference = 38
  const productOfDay = {
    name: "iPhone 15 Pro",
    priceARS: 3250000,
    priceUSD: 3250000 / blueRate,
    priceUSA: 999,
    difference: 260,
    image: "/placeholder.svg?height=200&width=200",
  }

  // Historical data for the chart (would be fetched from an API)
  const historicalData = [32, 35, 40, 38, 42, 39, 38]

  // FAQ items
  const faqItems = [
    {
      question: "¿Está cara la ropa en Argentina?",
      link: "/categorias/ropa",
      icon: "👕",
    },
    {
      question: "¿Una hamburguesa en Argentina vale el doble que en EE.UU.?",
      link: "/comparativas/comida-rapida",
      icon: "🍔",
    },
    {
      question: "¿Con la plata de un jean en Argentina me compro dos en Chile?",
      link: "/comparativas/ropa-regional",
      icon: "👖",
    },
    {
      question: "¿Está caro salir a comer afuera?",
      link: "/categorias/restaurantes",
      icon: "🍽️",
    },
    {
      question: "¿Conviene hacer el súper en Argentina o en Miami?",
      link: "/comparativas/supermercado",
      icon: "🛒",
    },
    {
      question: "¿Un auto en Argentina vale lo mismo que una casa afuera?",
      link: "/comparativas/autos-inmuebles",
      icon: "🚗",
    },
    {
      question: "¿Cuánto más pagamos por un iPhone?",
      link: "/categorias/tecnologia",
      icon: "📱",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">¿Argentina está cara en dólares blue?</h1>

      {/* Resumen general del día */}
      <section className="bg-yellow-50 rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Resumen del día</h2>
        <p className="text-xl">
          <span className="font-bold">Hoy, Argentina está un {priceDifference}% más cara que EE.UU. en promedio</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">Basado en un índice interno de productos destacados</p>
        <div className="flex items-center gap-2 mt-4">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span className="font-medium">Dólar Blue: ${blueRate} ARS</span>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Producto del día */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Producto del día</h2>
          <div className="flex flex-col items-center">
            <Image
              src={productOfDay.image || "/placeholder.svg"}
              alt={productOfDay.name}
              width={200}
              height={200}
              className="mb-4"
            />
            <h3 className="text-lg font-medium">{productOfDay.name}</h3>
            <div className="flex flex-col items-center mt-2 w-full">
              <div className="grid grid-cols-2 gap-4 w-full mb-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Precio en Argentina</p>
                  <p className="font-semibold">${productOfDay.priceARS.toLocaleString()} ARS</p>
                  <p className="text-sm">(${productOfDay.priceUSD.toFixed(2)} USD blue)</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Precio en EE.UU.</p>
                  <p className="font-semibold">${productOfDay.priceUSA} USD</p>
                </div>
              </div>
              <div className="bg-red-100 text-red-800 font-bold py-2 px-4 rounded-full text-center">
                {productOfDay.difference}% más caro en Argentina
              </div>
            </div>
          </div>
        </section>

        {/* Mini gráfico histórico */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Evolución semanal</h2>
          <div className="flex items-end justify-between h-40 gap-1">
            {historicalData.map((value, index) => (
              <div key={index} className="relative flex-1">
                <div className="bg-emerald-500 rounded-t-sm" style={{ height: `${value * 2}%` }}></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">{index + 1}/5</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-8">
            <span className="text-sm text-muted-foreground">Última semana</span>
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Tendencia: Estable</span>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ visual interactiva */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">¿Qué querés saber hoy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faqItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <Card className="p-4 hover:bg-slate-50 transition-colors cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{item.question}</p>
                    <div className="flex items-center text-emerald-600 mt-2 text-sm">
                      <span>Ver comparativa</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Add link to comparator */}
      <section className="text-center mb-12">
        <Link
          href="/comparador"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <Search className="h-5 w-5" />
          Ir al Comparador de Precios
        </Link>
      </section>

      <footer className="text-center text-sm text-muted-foreground mt-12 pb-8">
        <p>Datos actualizados al {new Date().toLocaleDateString("es-AR")}</p>
        <p className="mt-1">Los precios son referenciales y pueden variar según la región y el comercio</p>
      </footer>
    </main>
  )
}
