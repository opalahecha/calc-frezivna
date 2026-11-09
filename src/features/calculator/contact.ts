import type { Product } from './types';
import { formatPrice, getTotals } from './utils';

type ContactIntent = 'order' | 'consultation';

export const requestContact = (intent: ContactIntent, products: Product[]) => {
  const detail = {
    type: 'frezivna:contact-request',
    intent,
    products: products.map((product) => ({
      id: product.id,
      title: product.title,
      price: formatPrice(product.price),
    })),
    totals: getTotals(products),
  };

  if (window.parent !== window) {
    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : 'https://frezivna.com';

    window.parent.postMessage(detail, parentOrigin);
    return;
  }

  const contactUrl = import.meta.env.VITE_CONTACT_FORM_URL;

  if (contactUrl) {
    window.location.assign(contactUrl);
    return;
  }

  window.dispatchEvent(new CustomEvent('frezivna:contact-request', { detail }));
};
