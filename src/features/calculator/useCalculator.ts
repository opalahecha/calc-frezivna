import { useState } from 'react';

import { products } from './data';
import type { ProductGroup } from './types';
import { changeSelection, getTotals } from './utils';

export const useCalculator = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedProducts = products.filter((product) =>
    selectedIds.includes(product.id),
  );

  const handleSelect = (group: ProductGroup, productId: string) => {
    setSelectedIds((current) => changeSelection(current, group, productId));
  };

  const handleRemove = (productId: string) => {
    setSelectedIds((current) => current.filter((id) => id !== productId));
  };

  const handleClearGroup = (group: ProductGroup) => {
    setSelectedIds((current) =>
      current.filter(
        (id) => !group.products.some((product) => product.id === id),
      ),
    );
  };

  const handleClear = () => setSelectedIds([]);

  return {
    selectedIds,
    selectedProducts,
    totals: getTotals(selectedProducts),
    handleSelect,
    handleRemove,
    handleClearGroup,
    handleClear,
  };
};
