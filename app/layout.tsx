import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "¿Argentina está cara en dólares blue?",
  description: "Comparativa de precios entre Argentina y EE.UU. usando el dólar blue",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="bg-emerald-600 text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🇦🇷</span>
              <h1 className="text-xl font-bold">Argentina Precio</h1>
            </Link>
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link href="/comparador" className="hover:underline">
                    Comparador
                  </Link>
                </li>
                <li>
                  <Link href="/categorias" className="hover:underline">
                    Categorías
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}


import './globals.css'