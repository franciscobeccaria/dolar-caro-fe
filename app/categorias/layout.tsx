import React from 'react';

export default function CategoriasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen py-6">
      {children}
    </div>
  );
}
