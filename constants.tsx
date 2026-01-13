
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Boubou Royal "Conakry"',
    price: 450000,
    description: 'Boubou traditionnel revisité en coton damassé de haute qualité avec broderies artisanales.',
    category: 'Homme',
    images: ['https://picsum.photos/seed/boubou1/800/1200', 'https://picsum.photos/seed/boubou2/800/1200'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Bleu Indigo', 'Blanc Pur', 'Doré'],
    isBestSeller: true,
    isNew: true,
    stock: 12,
    material: 'Coton Damassé 100%',
    careInstructions: 'Lavage à la main recommandé ou nettoyage à sec.'
  },
  {
    id: '2',
    name: 'Robe "Nimbe" en Bogolan',
    price: 320000,
    description: 'Robe d\'été légère avec motifs inspirés du Bogolan et coupe moderne asymétrique.',
    category: 'Femme',
    images: ['https://picsum.photos/seed/robe1/800/1200', 'https://picsum.photos/seed/robe2/800/1200'],
    sizes: ['S', 'M', 'L'],
    colors: ['Terre brûlée', 'Noir'],
    isNew: true,
    stock: 5,
    material: 'Linge mélangé',
    careInstructions: 'Lavage en machine à 30°C.'
  },
  {
    id: '3',
    name: 'Veste "Syli" Bomber',
    price: 550000,
    description: 'Veste bomber unisexe avec détails en tissu wax authentique sur les manches.',
    category: 'Unisexe',
    images: ['https://picsum.photos/seed/bomber1/800/1200'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Kaki', 'Noir'],
    isLimited: true,
    stock: 3,
    material: 'Nylon & Coton Wax',
    careInstructions: 'Nettoyage à sec uniquement.'
  },
  {
    id: '4',
    name: 'Chemise "Fouta" Slim',
    price: 185000,
    description: 'Chemise cintrée en coton fin avec col officier et motif géométrique discret.',
    category: 'Homme',
    images: ['https://picsum.photos/seed/chemise1/800/1200'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Blanc', 'Bleu ciel'],
    isBestSeller: false,
    stock: 20,
    material: 'Popeline de coton',
    careInstructions: 'Repassage facile.'
  },
  {
    id: '5',
    name: 'Ensemble "Kindia" Flow',
    price: 680000,
    description: 'Ensemble palazzo et haut fluide pour une élégance sans effort.',
    category: 'Femme',
    images: ['https://picsum.photos/seed/ensemble1/800/1200'],
    sizes: ['M', 'L'],
    colors: ['Ocre', 'Vert émeraude'],
    isNew: true,
    stock: 8,
    material: 'Soie de coton',
    careInstructions: 'Lavage délicat.'
  }
];

export const CURRENCY = 'GNF';
export const DELIVERY_FEES = {
  STANDARD: 25000,
  EXPRESS: 50000
};
