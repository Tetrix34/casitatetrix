
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white mt-12 py-6 border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} Catálogo Online Gemini. Todos los derechos reservados.</p>
                <p className="text-sm mt-1">Datos de productos generados dinámicamente por la API Gemini de Google.</p>
            </div>
        </footer>
    );
}
