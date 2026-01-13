
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import AIChatbot from './components/AIChatbot';
import { ShoppingBag, X, Trash2, ChevronRight, Wallet, CreditCard } from 'lucide-react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart: () => setCart([]), total: cartTotal }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>

          <footer className="bg-white border-t py-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <span className="brand-font text-3xl font-bold tracking-tighter block mb-6 uppercase">GUINÉE<span className="text-red-600">STORE</span></span>
                <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                  L'élégance guinéenne moderne à portée de main. Notre mission est de sublimer notre culture à travers des designs contemporains de haute qualité.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition">IG</div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition">FB</div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white cursor-pointer transition">TK</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Collections</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li className="hover:text-black cursor-pointer">Hommes</li>
                  <li className="hover:text-black cursor-pointer">Femmes</li>
                  <li className="hover:text-black cursor-pointer">Unisexe</li>
                  <li className="hover:text-black cursor-pointer">Nouveautés</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li className="hover:text-black cursor-pointer">Contact</li>
                  <li className="hover:text-black cursor-pointer">Livraison & Retours</li>
                  <li className="hover:text-black cursor-pointer">Guide des Tailles</li>
                  <li className="hover:text-black cursor-pointer">FAQ</li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
              <p>&copy; 2024 Guinée STORE. Tous droits réservés.</p>
              <div className="flex gap-6">
                <span>CGV</span>
                <span>Politique de Confidentialité</span>
                <span>Mentions Légales</span>
              </div>
            </div>
          </footer>

          <AIChatbot />

          {/* Dynamic Cart Drawer */}
          {isCartOpen && (
            <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex justify-end">
              <div className="bg-white w-full sm:w-[450px] h-full flex flex-col shadow-2xl animate-slide-in">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6" /> Mon Panier ({cart.length})
                  </h2>
                  <button onClick={() => { setIsCartOpen(false); setIsCheckingOut(false); }}><X className="w-6 h-6" /></button>
                </div>

                {!isCheckingOut ? (
                  <>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {cart.length === 0 ? (
                        <div className="text-center py-20">
                          <ShoppingBag className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                          <p className="text-gray-400">Votre panier est vide</p>
                          <button onClick={() => setIsCartOpen(false)} className="mt-6 text-black font-bold border-b border-black">Continuer mes achats</button>
                        </div>
                      ) : (
                        cart.map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="w-20 h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                              <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <h4 className="font-bold text-sm">{item.product.name}</h4>
                                <button onClick={() => removeFromCart(idx)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                              </div>
                              <p className="text-xs text-gray-500 mb-2">Taille: {item.selectedSize} | {item.selectedColor}</p>
                              <p className="font-bold text-sm">{item.product.price.toLocaleString()} GNF</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="p-6 border-t space-y-4 bg-gray-50">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Sous-total</span>
                          <span>{cartTotal.toLocaleString()} GNF</span>
                        </div>
                        <button 
                          onClick={() => setIsCheckingOut(true)}
                          className="w-full bg-black text-white h-14 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition"
                        >
                          Passer à la caisse <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-6 flex-1 overflow-y-auto space-y-10">
                    <h3 className="text-2xl font-bold">Paiement Sécurisé</h3>
                    
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Sélectionnez votre mode de paiement</span>
                      <div className="space-y-4">
                        <button className="w-full p-4 border-2 border-yellow-500 rounded-2xl flex items-center justify-between bg-yellow-50/50">
                          <div className="flex items-center gap-3">
                            <Wallet className="w-6 h-6 text-yellow-600" />
                            <div className="text-left">
                              <p className="font-bold text-sm">Orange Money / MTN</p>
                              <p className="text-[10px] text-gray-500">Paiement Mobile National</p>
                            </div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-4 border-yellow-600"></div>
                        </button>

                        <button className="w-full p-4 border-2 border-gray-100 rounded-2xl flex items-center justify-between hover:border-black transition">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-gray-400" />
                            <div className="text-left">
                              <p className="font-bold text-sm">Carte Bancaire / PayPal</p>
                              <p className="text-[10px] text-gray-500">Visa, Mastercard, Diaspora</p>
                            </div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-3xl">
                       <p className="text-sm font-bold mb-4">Récapitulatif</p>
                       <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between"><span>Articles ({cart.length})</span><span>{cartTotal.toLocaleString()} GNF</span></div>
                          <div className="flex justify-between"><span>Livraison</span><span>25.000 GNF</span></div>
                          <div className="flex justify-between font-bold text-black border-t pt-4 text-lg"><span>Total</span><span>{(cartTotal + 25000).toLocaleString()} GNF</span></div>
                       </div>
                    </div>

                    <button 
                      onClick={() => alert("Simulation: Redirection vers le portail de paiement...")}
                      className="w-full bg-yellow-500 text-white h-16 rounded-full font-bold shadow-xl hover:bg-yellow-600 transition"
                    >
                      Payer maintenant
                    </button>

                    <button onClick={() => setIsCheckingOut(false)} className="w-full text-center text-sm font-bold text-gray-400 hover:text-black">
                      Retour au panier
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
