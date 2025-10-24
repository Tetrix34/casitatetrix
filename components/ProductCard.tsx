import React from 'react';
import type { Product } from '../types';
import { WhatsappIcon } from './icons/WhatsappIcon';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleBuyClick = () => {
    const phoneNumber = '50232123192';
    const message = `Hola, estoy interesado en comprar el producto: "${product.name}".`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 truncate">{product.name}</h3>
        <p className="text-sm text-slate-600 mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-extrabold text-indigo-700">${product.price.toFixed(2)}</p>
          <button
            onClick={handleBuyClick}
            className="flex items-center justify-center bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors duration-300"
            aria-label={`Comprar ${product.name} en WhatsApp`}
          >
            <WhatsappIcon className="h-5 w-5 mr-2" />
            <span>Compra</span>
          </button>
        </div>
      </div>
    </div>
  );
};