
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-semibold text-lg">Generando Tu Catálogo...</p>
      <p className="mt-1 text-slate-500">Por favor, espera un momento.</p>
    </div>
  );
};
