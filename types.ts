
export type Category = 'Homme' | 'Femme' | 'Unisexe' | 'Nouveautés' | 'Collections limitées';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  video?: string;
  sizes: string[];
  colors: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  isLimited?: boolean;
  stock: number;
  material: string;
  careInstructions: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Confirmée' | 'En cours' | 'Livrée';
  paymentMethod: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  wishlist: string[];
  orders: Order[];
}
