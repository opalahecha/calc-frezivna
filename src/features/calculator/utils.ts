import type { Price, PriceTotals, Product, ProductGroup } from './types';

const numberFormat = new Intl.NumberFormat('uk-UA');

const formatNumber = (amount: number) => numberFormat.format(amount);

export const formatPrice = (price: Price): string => {
  if (price.kind === 'fixed' || price.kind === 'from') {
    const prefix = price.kind === 'from' ? 'від ' : '';

    return `${prefix}${formatNumber(price.amount)} грн`;
  }

  if (price.kind === 'range') {
    return `$${formatNumber(price.min)}–${formatNumber(price.max)}`;
  }

  return 'Вартість уточнюється';
};

export const changeSelection = (
  selectedIds: string[],
  group: ProductGroup,
  productId: string,
): string[] => {
  if (!group.products.some((product) => product.id === productId)) {
    return selectedIds;
  }

  if (group.selection === 'single') {
    const otherIds = selectedIds.filter(
      (id) => !group.products.some((product) => product.id === id),
    );

    return [...otherIds, productId];
  }

  return selectedIds.includes(productId)
    ? selectedIds.filter((id) => id !== productId)
    : [...selectedIds, productId];
};

export const getTotals = (products: Product[]): PriceTotals => {
  return products.reduce<PriceTotals>(
    (totals, product) => {
      const { price } = product;

      if (price.kind === 'fixed' || price.kind === 'from') {
        totals.uah += price.amount;
        totals.hasFromPrice ||= price.kind === 'from';
      } else if (price.kind === 'range') {
        totals.usdMin += price.min;
        totals.usdMax += price.max;
      } else {
        totals.quoteCount += 1;
      }

      return totals;
    },
    { uah: 0, usdMin: 0, usdMax: 0, quoteCount: 0, hasFromPrice: false },
  );
};

export const getTotalPriceLines = (totals: PriceTotals) => {
  const dollars = `$${formatNumber(totals.usdMin)}–${formatNumber(totals.usdMax)}`;

  if (totals.uah > 0) {
    const prefix = totals.hasFromPrice || totals.quoteCount > 0 ? 'від ' : '';

    return {
      primary: `${prefix}${formatNumber(totals.uah)} грн`,
      secondary: totals.usdMax > 0 ? `+ ${dollars}` : '',
    };
  }

  return {
    primary: totals.usdMax > 0 ? dollars : 'Вартість уточнюється',
    secondary: '',
  };
};
