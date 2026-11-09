export type ContactIntent = 'order' | 'consultation';

export type Price =
  | { kind: 'fixed' | 'from'; amount: number; currency: 'UAH' }
  | { kind: 'range'; min: number; max: number; currency: 'USD' }
  | { kind: 'quote' };

export interface Product {
  id: string;
  title: string;
  description: string;
  badge?: string;
  price: Price;
}

export interface ProductGroup {
  id: string;
  title: string;
  hint: string;
  selection: 'single' | 'multiple';
  products: Product[];
}

export interface Stage {
  id: string;
  number: string;
  title: string;
  description: string;
  groups: ProductGroup[];
}

export interface PriceTotals {
  uah: number;
  usdMin: number;
  usdMax: number;
  quoteCount: number;
  hasFromPrice: boolean;
}
