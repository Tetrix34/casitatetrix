
import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from './types';
import { generateCatalogData } from './services/geminiService';
import { ProductCard } from './components/ProductCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    if (!allProducts.length) return [];
    const uniqueCategories = ['Todos', ...new Set(allProducts.map(p => p.category))];
    return uniqueCategories;
  }, [allProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const products = await generateCatalogData();
        setAllProducts(products);
        setDisplayedProducts(products);
      } catch (err) {
        console.error(err);
        setError('No se pudo generar el catálogo de productos. Por favor, intenta refrescar la página.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayedProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <div className="text-center text-red-500 font-semibold p-8">{error}</div>;
    }
    if (displayedProducts.length === 0) {
      return (
        <div className="text-center text-slate-500 p-8">
            <h2 className="text-2xl font-bold mb-2">No se encontraron productos</h2>
            <p>Intenta ajustar tu búsqueda o los filtros de categoría.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 p-4 md:p-8">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
