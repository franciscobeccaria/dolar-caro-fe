import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Mock data for categories (same as in the main categories page)
const categories = [
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: '💻',
    priceDifference: 85,
    trend: 'up',
    description: 'Productos electrónicos, gadgets, computadoras y accesorios tecnológicos.',
    products: [
      { name: 'iPhone 15 Pro', argentinaPrice: 1200, usaPrice: 650, difference: 85 },
      { name: 'MacBook Air M2', argentinaPrice: 1800, usaPrice: 999, difference: 80 },
      { name: 'Samsung S23', argentinaPrice: 950, usaPrice: 550, difference: 73 },
    ]
  },
  {
    id: 'ropa-calzado',
    name: 'Ropa y Calzado',
    icon: '👕',
    priceDifference: 45,
    trend: 'stable',
    description: 'Indumentaria, calzado deportivo y de vestir, accesorios de moda.',
    products: [
      { name: 'Nike Air Force 1', argentinaPrice: 180, usaPrice: 110, difference: 64 },
      { name: 'Levi\'s 501', argentinaPrice: 85, usaPrice: 60, difference: 42 },
      { name: 'Adidas Superstar', argentinaPrice: 120, usaPrice: 90, difference: 33 },
    ]
  },
  {
    id: 'supermercado-alimentos',
    name: 'Supermercado y Alimentos',
    icon: '🛒',
    priceDifference: 30,
    trend: 'up',
    description: 'Productos alimenticios, bebidas, artículos de limpieza y cuidado personal.',
    products: [
      { name: 'Big Mac', argentinaPrice: 5, usaPrice: 4, difference: 25 },
      { name: 'Coca-Cola 2L', argentinaPrice: 2.5, usaPrice: 2, difference: 25 },
      { name: 'Café molido 250g', argentinaPrice: 8, usaPrice: 6, difference: 33 },
    ]
  },
  {
    id: 'vivienda',
    name: 'Vivienda',
    icon: '🏠',
    priceDifference: -20,
    trend: 'down',
    description: 'Alquileres, servicios básicos, mobiliario y artículos para el hogar.',
    products: [
      { name: 'Alquiler 2 amb. (mensual)', argentinaPrice: 400, usaPrice: 1200, difference: -67 },
      { name: 'Electricidad (mensual)', argentinaPrice: 30, usaPrice: 120, difference: -75 },
      { name: 'Internet 100Mbps', argentinaPrice: 20, usaPrice: 60, difference: -67 },
    ]
  },
  {
    id: 'transporte',
    name: 'Transporte',
    icon: '🚗',
    priceDifference: -35,
    trend: 'down',
    description: 'Transporte público, combustible, mantenimiento de vehículos.',
    products: [
      { name: 'Boleto de colectivo', argentinaPrice: 0.30, usaPrice: 2.75, difference: -89 },
      { name: 'Taxi (viaje promedio)', argentinaPrice: 5, usaPrice: 15, difference: -67 },
      { name: 'Nafta (litro)', argentinaPrice: 1.2, usaPrice: 1, difference: 20 },
    ]
  },
];

interface CategoryDetailProps {
  params: {
    slug: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryDetailProps) {
  const { slug } = params;
  const category = categories.find(cat => cat.id === slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
        <Link href="/categorias" className="text-emerald-600 hover:underline flex items-center gap-1">
          <ArrowLeft size={16} />
          Volver a categorías
        </Link>
      </div>
    );
  }

  const { name, icon, description, priceDifference, products } = category;
  const isMoreExpensive = priceDifference > 0;
  const textColorClass = isMoreExpensive ? 'text-red-600' : 'text-green-600';

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/categorias" className="text-emerald-600 hover:underline flex items-center gap-1 mb-6">
        <ArrowLeft size={16} />
        Volver a categorías
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      <div className={`p-4 rounded-lg ${isMoreExpensive ? 'bg-red-50' : 'bg-green-50'} mb-8`}>
        <p className={`font-medium ${textColorClass}`}>
          En promedio, los productos de esta categoría son 
          {isMoreExpensive 
            ? ` un ${Math.abs(priceDifference)}% más caros en Argentina` 
            : ` un ${Math.abs(priceDifference)}% más baratos en Argentina`} 
          comparado con Estados Unidos.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Productos comparados</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Producto</th>
              <th className="p-3 text-right border">Precio en Argentina (USD)</th>
              <th className="p-3 text-right border">Precio en EE.UU. (USD)</th>
              <th className="p-3 text-right border">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const productIsMoreExpensive = product.difference > 0;
              const productTextColor = productIsMoreExpensive ? 'text-red-600' : 'text-green-600';
              
              return (
                <tr key={index} className="border hover:bg-gray-50">
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 text-right border">${product.argentinaPrice}</td>
                  <td className="p-3 text-right border">${product.usaPrice}</td>
                  <td className={`p-3 text-right border font-medium ${productTextColor}`}>
                    {productIsMoreExpensive 
                      ? `+${product.difference}%` 
                      : `${product.difference}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Nota: Los precios están expresados en dólares estadounidenses (USD) y son aproximados. 
          La comparación se realiza principalmente con Estados Unidos, pero puede variar según la región.
        </p>
      </div>
    </div>
  );
}
