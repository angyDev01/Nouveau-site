
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, CURRENCY } from '../constants';
import { ShoppingBag, Heart, Shield, Info, Truck, RefreshCw, Star } from 'lucide-react';
import { useCart } from '../App';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [mainImage, setMainImage] = useState(product?.images[0] || '');

  if (!product) return <div className="pt-40 text-center">Produit introuvable</div>;

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition ${mainImage === img ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-xs text-gray-400 font-semibold">(24 avis clients)</span>
          </div>

          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-6 font-medium">{product.category}</p>
          <p className="text-3xl font-bold mb-8 text-yellow-600">{product.price.toLocaleString()} {CURRENCY}</p>
          
          <p className="text-gray-600 leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-sm uppercase tracking-wider">Taille</span>
                <button className="text-xs text-gray-500 underline">Guide des tailles</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-12 flex items-center justify-center rounded-lg border-2 text-sm font-bold transition ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-sm uppercase tracking-wider block mb-4">Couleur : <span className="text-gray-400 font-medium">{selectedColor}</span></span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`h-10 px-4 flex items-center gap-2 rounded-full border-2 text-xs font-bold transition ${selectedColor === color ? 'border-black' : 'border-gray-200 hover:border-black'}`}
                  >
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div> {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-10">
            <button 
              onClick={() => addToCart(product, selectedSize, selectedColor)}
              className="flex-1 bg-black text-white h-16 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-yellow-600 transition shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" /> Ajouter au panier
            </button>
            <button className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-10">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5" /> <span>Livraison offerte dès 1.000.000 GNF</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RefreshCw className="w-5 h-5" /> <span>Retours gratuits sous 15 jours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="w-5 h-5" /> <span>Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Info className="w-5 h-5" /> <span>Matière : {product.material}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="border-t pt-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
               <h3 className="text-xl font-bold mb-6">Matière & Entretien</h3>
               <p className="text-gray-500 mb-4">{product.material}</p>
               <ul className="space-y-2 text-gray-500 list-disc list-inside">
                  <li>Lavage délicat recommandé</li>
                  <li>Ne pas utiliser d'agent de blanchiment</li>
                  <li>{product.careInstructions}</li>
               </ul>
            </div>
            <div>
               <h3 className="text-xl font-bold mb-6">Livraison & Retours</h3>
               <p className="text-gray-500">Nous livrons partout en Guinée par service express. Pour la diaspora, nous utilisons DHL et Colissimo. Les délais varient de 48h (Conakry) à 10 jours (International).</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;
