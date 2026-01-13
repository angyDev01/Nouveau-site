
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'Tous');
  const [sortBy, setSortBy] = useState<string>('Nouveautés');

  const categories = ['Tous', 'Homme', 'Femme', 'Unisexe', 'Nouveautés', 'Collections limitées'];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (selectedCategory !== 'Tous') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (sortBy === 'Prix croissant') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'Prix décroissant') result = [...result].sort((a, b) => b.price - a.price);
    
    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Notre Boutique</h1>
          <p className="text-gray-500">Explorez {filteredProducts.length} articles d'exception.</p>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold">
              <Filter className="w-4 h-4" />
              Catégorie: {selectedCategory}
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white border rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[200px]">
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm ${selectedCategory === c ? 'bg-gray-50 font-bold' : ''}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold">
              <SlidersHorizontal className="w-4 h-4" />
              Trier par: {sortBy}
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full right-0 mt-2 bg-white border rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[200px]">
              {['Nouveautés', 'Prix croissant', 'Prix décroissant', 'Popularité'].map(s => (
                <button 
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm ${sortBy === s ? 'bg-gray-50 font-bold' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && <span className="bg-black text-white text-[9px] font-bold px-2 py-1 rounded">NOUVEAU</span>}
                {product.isLimited && <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-1 rounded">LIMITÉ</span>}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                <p className="text-gray-400 text-xs">{product.category}</p>
              </div>
              <p className="font-bold text-sm">{product.price.toLocaleString()} GNF</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-gray-500 mb-4">Aucun produit ne correspond à votre recherche.</p>
          <button onClick={() => setSelectedCategory('Tous')} className="text-black font-bold border-b border-black">Tout afficher</button>
        </div>
      )}
    </div>
  );
};

export default Shop;
