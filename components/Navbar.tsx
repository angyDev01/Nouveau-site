
import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(true)} className="lg:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="brand-font text-2xl font-bold tracking-tighter">GUINÉE<span className="text-red-600">STORE</span></span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-8 font-medium text-sm uppercase tracking-wider">
          <Link to="/shop?category=Homme" className="hover:text-yellow-600 transition">Homme</Link>
          <Link to="/shop?category=Femme" className="hover:text-yellow-600 transition">Femme</Link>
          <Link to="/shop?category=Unisexe" className="hover:text-yellow-600 transition">Unisexe</Link>
          <Link to="/shop?category=Nouveautés" className="hover:text-yellow-600 transition">Nouveautés</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition">
            <User className="w-5 h-5" />
          </Link>
          <button onClick={onOpenCart} className="p-2 hover:bg-gray-100 rounded-full transition relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="bg-white w-4/5 h-full p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-10">
              <span className="brand-font text-xl font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col space-y-6 text-lg font-semibold">
              <Link onClick={() => setIsOpen(false)} to="/shop?category=Homme">Homme</Link>
              <Link onClick={() => setIsOpen(false)} to="/shop?category=Femme">Femme</Link>
              <Link onClick={() => setIsOpen(false)} to="/shop?category=Unisexe">Unisexe</Link>
              <Link onClick={() => setIsOpen(false)} to="/shop?category=Nouveautés">Nouveautés</Link>
              <Link onClick={() => setIsOpen(false)} to="/shop?category=Collections limitées">Exclusivités</Link>
            </div>
            <div className="mt-auto pt-10 border-t mt-10 space-y-4 text-gray-500">
              <Link to="/wishlist" className="flex items-center gap-2"><Heart className="w-5 h-5" /> Ma Wishlist</Link>
              <Link to="/account" className="flex items-center gap-2"><User className="w-5 h-5" /> Mon Compte</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
