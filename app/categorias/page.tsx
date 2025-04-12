import React from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for categories
const categories = [
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: '💻',
    priceDifference: 85, // positive means more expensive in Argentina
    trend: 'up', // 'up', 'down', or 'stable'
  },
  {
    id: 'ropa-calzado',
    name: 'Ropa y Calzado',
    icon: '👕',
    priceDifference: 45,
    trend: 'stable',
  },
  {
    id: 'supermercado-alimentos',
    name: 'Supermercado y Alimentos',
    icon: '🛒',
    priceDifference: 30,
    trend: 'up',
  },
  {
    id: 'vivienda',
    name: 'Vivienda',
    icon: '🏠',
    priceDifference: -20, // negative means cheaper in Argentina
    trend: 'down',
  },
  {
    id: 'transporte',
    name: 'Transporte',
    icon: '🚗',
    priceDifference: -35,
    trend: 'down',
  },
];

export default function CategoriasPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categorías</h1>
      <p className="text-gray-600 mb-8">
        Explora si Argentina es cara o barata en diferentes tipos de productos y servicios
        comparado con otros países.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}

interface CategoryProps {
  category: {
    id: string;
    name: string;
    icon: string;
    priceDifference: number;
    trend: 'up' | 'down' | 'stable';
  };
}

function CategoryCard({ category }: CategoryProps) {
  const { id, name, icon, priceDifference, trend } = category;
  
  // Determine if Argentina is more expensive or cheaper
  const isMoreExpensive = priceDifference > 0;
  const absoluteDifference = Math.abs(priceDifference);
  
  // Determine background color based on price difference
  const bgColorClass = isMoreExpensive 
    ? 'bg-red-50 border-red-200 hover:bg-red-100' 
    : 'bg-green-50 border-green-200 hover:bg-green-100';
  
  // Determine text color based on price difference
  const textColorClass = isMoreExpensive ? 'text-red-600' : 'text-green-600';
  
  return (
    <Link href={`/categorias/${id}`}>
      <div className={`p-6 rounded-lg border ${bgColorClass} transition-colors duration-200 h-full`}>
        <div className="flex justify-between items-start mb-4">
          <span className="text-4xl">{icon}</span>
          {trend !== 'stable' && (
            <span className="text-gray-500">
              {trend === 'up' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            </span>
          )}
        </div>
        
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        
        <p className={`font-medium ${textColorClass}`}>
          {isMoreExpensive 
            ? `+${absoluteDifference}% más caro en Argentina` 
            : `–${absoluteDifference}% más barato en Argentina`}
        </p>
      </div>
    </Link>
  );
}
