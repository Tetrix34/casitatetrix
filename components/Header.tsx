
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { StoreIcon } from './icons/StoreIcon';

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, categories, selectedCategory, onCategoryChange }) => {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center text-2xl font-bold text-slate-900">
                        <StoreIcon className="h-8 w-8 text-indigo-600 mr-2"/>
                        <h1>Catálogo Gemini</h1>
                    </div>
                    <div className="relative w-full md:w-auto md:max-w-xs">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>
                 {categories.length > 0 && (
                    <nav className="py-2 border-t border-slate-200 overflow-x-auto">
                        <ul className="flex items-center gap-2">
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => onCategoryChange(category)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                                            selectedCategory === category
                                                ? 'bg-indigo-600 text-white shadow'
                                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                 )}
            </div>
        </header>
    );
}
