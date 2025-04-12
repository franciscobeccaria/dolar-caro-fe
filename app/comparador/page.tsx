"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, TrendingUp, Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for autocomplete suggestions
const productSuggestions = [
  "iPhone 15 Pro",
  "iPhone 15",
  "iPhone 14 Pro",
  "MacBook Pro 16",
  "Samsung Galaxy S23",
  "PlayStation 5",
  "Nintendo Switch",
  "AirPods Pro",
  "iPad Pro",
]

// Mock product data
const mockProducts = {
  "iPhone 15 Pro": {
    name: "iPhone 15 Pro (256GB)",
    imageUrl: "/placeholder.svg?height=300&width=300",
    priceARS: 3250000,
    priceUSA: 999,
    source: {
      argentina: "iPoint (Distribuidor oficial)",
      usa: "Apple Store US",
    },
    historicalData: [
      { date: "Ene 2024", gap: 240 },
      { date: "Feb 2024", gap: 250 },
      { date: "Mar 2024", gap: 255 },
      { date: "Abr 2024", gap: 260 },
      { date: "May 2024", gap: 260 },
    ],
  },
  "MacBook Pro 16": {
    name: "MacBook Pro 16 (M3, 512GB)",
    imageUrl: "/placeholder.svg?height=300&width=300",
    priceARS: 6500000,
    priceUSA: 2499,
    source: {
      argentina: "OneClick (Distribuidor oficial)",
      usa: "Apple Store US",
    },
    historicalData: [
      { date: "Ene 2024", gap: 180 },
      { date: "Feb 2024", gap: 190 },
      { date: "Mar 2024", gap: 200 },
      { date: "Abr 2024", gap: 210 },
      { date: "May 2024", gap: 205 },
    ],
  },
  "PlayStation 5": {
    name: "PlayStation 5 (Edición Digital)",
    imageUrl: "/placeholder.svg?height=300&width=300",
    priceARS: 1800000,
    priceUSA: 399,
    source: {
      argentina: "Sony Store Argentina",
      usa: "Best Buy",
    },
    historicalData: [
      { date: "Ene 2024", gap: 220 },
      { date: "Feb 2024", gap: 230 },
      { date: "Mar 2024", gap: 240 },
      { date: "Abr 2024", gap: 250 },
      { date: "May 2024", gap: 255 },
    ],
  },
}

export default function ComparadorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("iPhone 15 Pro") // Default product selected
  const blueRate = 1250 // Mock blue dollar rate

  // Filter suggestions based on search query
  const filteredSuggestions = productSuggestions.filter((product) =>
    product.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectProduct = (product: string) => {
    setSearchQuery(product)
    setSelectedProduct(product)
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    if (productSuggestions.includes(searchQuery)) {
      setSelectedProduct(searchQuery)
    }
  }

  // Calculate product details if a product is selected
  const productDetails = selectedProduct ? mockProducts[selectedProduct as keyof typeof mockProducts] : null

  const priceUSDBlue = productDetails ? productDetails.priceARS / blueRate : 0
  const priceDifferencePercent = productDetails ? Math.round((priceUSDBlue / productDetails.priceUSA - 1) * 100) : 0
  const priceDifferenceAmount = productDetails ? priceUSDBlue - productDetails.priceUSA : 0

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Comparador de Precios</h1>

      {/* Buscador */}
      <section className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="flex">
            <Input
              type="text"
              placeholder="Buscar producto (ej: iPhone 15 Pro, PlayStation 5...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              className="rounded-r-none"
            />
            <Button onClick={handleSearch} className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {/* Autocomplete suggestions */}
          {showSuggestions && searchQuery.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleSelectProduct(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-muted-foreground">No se encontraron productos</div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Comparación detallada */}
      {selectedProduct && productDetails && (
        <section className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center">
                  <Image
                    src={productDetails.imageUrl || "/placeholder.svg"}
                    alt={productDetails.name}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">{productDetails.name}</h2>

                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Precio en Argentina</h3>
                        <p className="text-xl font-bold">${productDetails.priceARS.toLocaleString()} ARS</p>
                        <p className="text-emerald-600 font-medium">${priceUSDBlue.toFixed(2)} USD (blue)</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Precio en EE.UU.</h3>
                        <p className="text-xl font-bold">${productDetails.priceUSA} USD</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Brecha de precio</h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Calculado usando el dólar blue: ${blueRate} ARS</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xl font-bold text-red-600">+{priceDifferencePercent}%</p>
                        <p className="font-medium">+${priceDifferenceAmount.toFixed(2)} USD</p>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Fuente Argentina:</span> {productDetails.source.argentina}
                      </p>
                      <p>
                        <span className="font-medium">Fuente EE.UU.:</span> {productDetails.source.usa}
                      </p>
                      <p className="mt-1">Actualizado: {new Date().toLocaleDateString("es-AR")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico */}
          <Tabs defaultValue="chart">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Histórico de brecha</h3>
              <TabsList>
                <TabsTrigger value="chart">Gráfico</TabsTrigger>
                <TabsTrigger value="table">Tabla</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chart" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="h-64 flex items-end justify-between gap-2">
                    {productDetails.historicalData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-emerald-500 rounded-t-sm"
                          style={{ height: `${(data.gap / 300) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2">{data.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-muted-foreground">Últimos 5 meses</span>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {productDetails.historicalData[productDetails.historicalData.length - 1].gap >
                        productDetails.historicalData[0].gap
                          ? "Tendencia: Alza"
                          : "Tendencia: Estable"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Fecha</th>
                          <th className="text-right py-3 px-4">Brecha (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.historicalData.map((data, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{data.date}</td>
                            <td className="text-right py-3 px-4 font-medium">+{data.gap}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      )}
    </main>
  )
}
