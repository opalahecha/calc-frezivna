import type { ContactIntent, Product } from './types';
import { formatPrice, getContactSummary, getTotals } from './utils';

let activeRequestId: string | undefined;

const getParentOrigin = () =>
  document.referrer
    ? new URL(document.referrer).origin
    : 'https://frezivna.com';

export const subscribeToContactCompletion = (onComplete: () => void) => {
  const parentOrigin = getParentOrigin();
  const handleMessage = (event: MessageEvent) => {
    if (
      window.parent !== window &&
      event.source === window.parent &&
      event.origin === parentOrigin &&
      event.data?.type === 'frezivna:contact-complete' &&
      activeRequestId &&
      event.data.requestId === activeRequestId
    ) {
      activeRequestId = undefined;
      onComplete();
    }
  };

  window.addEventListener('message', handleMessage);

  return () => window.removeEventListener('message', handleMessage);
};

export const requestContact = (intent: ContactIntent, products: Product[]) => {
  const totals = getTotals(products);
  const detail = {
    type: 'frezivna:contact-request',
    requestId: crypto.randomUUID(),
    intent,
    summary: getContactSummary(intent, products, totals),
    products: products.map((product) => ({
      id: product.id,
      title: product.title,
      price: formatPrice(product.price),
    })),
    totals,
  };

  if (window.parent !== window) {
    activeRequestId = detail.requestId;
    window.parent.postMessage(detail, getParentOrigin());
    return;
  }

  const contactUrl = import.meta.env.VITE_CONTACT_FORM_URL;

  if (contactUrl) {
    window.location.assign(contactUrl);
    return;
  }

  window.dispatchEvent(new CustomEvent('frezivna:contact-request', { detail }));
};
