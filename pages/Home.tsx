
import React from 'react';
import { ArrowRight, Star, TrendingUp, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img 
          src="https://picsum.photos/seed/guineastore-hero/1920/1080" 
          alt="African Fashion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-white">
            <h1 className="text-5xl md:text-8xl font-bold mb-6 max-w-3xl leading-tight">
              L'Afrique Moderne, <br/> 
              <span className="italic">Une Signature.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl text-gray-200">
              Découvrez la collection 2024. Fusion parfaite entre artisanat Guinéen et élégance urbaine internationale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-white transition flex items-center gap-2">
                Découvrir la Boutique <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/shop?category=Collections limitées" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition">
                Editions Limitées
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 guinea-gradient"></div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-8">
          <div className="flex items-center gap-4">
            <Truck className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-bold text-sm">Livraison Express</p>
              <p className="text-xs text-gray-500">Guinée & International</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-bold text-sm">Best Sellers</p>
              <p className="text-xs text-gray-500">Choisis par la communauté</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-bold text-sm">Qualité Premium</p>
              <p className="text-xs text-gray-500">Matières sélectionnées</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-bold text-sm">Paiement Sécurisé</p>
              <p className="text-xs text-gray-500">Mobile Money & CB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Nouveautés</h2>
              <p className="text-gray-500">Les dernières créations de nos ateliers de Conakry.</p>
            </div>
            <Link to="/shop" className="text-black font-bold border-b-2 border-black pb-1 hover:text-yellow-600 hover:border-yellow-600 transition">
              Tout Voir
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featured.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200 mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  {product.isNew && <span className="absolute top-4 left-4 bg-black text-white text-[10px] px-3 py-1 uppercase tracking-widest rounded-full">Nouveau</span>}
                  {product.isBestSeller && <span className="absolute top-4 left-4 bg-yellow-500 text-white text-[10px] px-3 py-1 uppercase tracking-widest rounded-full">Best Seller</span>}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg">Voir l'article</button>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <p className="font-bold text-black">{product.price.toLocaleString()} GNF</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <img 
                src="https://picsum.photos/seed/guineaculture/800/1000" 
                alt="Culture Guinéenne" 
                className="rounded-3xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-20"></div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Plus qu'une boutique, un héritage.</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Guinée STORE célèbre la richesse de notre pays. Chaque vêtement raconte une histoire, de l'Indigo du Fouta aux motifs urbains de Kaloum. Nous collaborons avec des artisans locaux pour garantir une authenticité sans compromis.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              En choisissant Guinée STORE, vous soutenez la mode responsable et l'entrepreneuriat local guinéen.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-yellow-500 font-bold hover:text-yellow-400">
              Notre histoire <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
