import type { Product } from '../../features/calculator/types';
import { formatPrice } from '../../features/calculator/utils';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  groupId: string;
  isSelected: boolean;
  isSingle: boolean;
  onSelect: () => void;
}

export const ProductCard = ({
  product,
  groupId,
  isSelected,
  isSingle,
  onSelect,
}: Props) => {
  const descriptionId = `${product.id}-description`;
  const titleId = `${product.id}-title`;
  const badgeId = `${product.id}-badge`;

  return (
    <label
      className={[
        styles['product-card'],
        isSelected ? styles['product-card--selected'] : '',
      ].join(' ')}
    >
      <input
        className={styles['product-card__control']}
        type={isSingle ? 'radio' : 'checkbox'}
        name={groupId}
        value={product.id}
        checked={isSelected}
        aria-labelledby={titleId}
        aria-describedby={
          product.badge ? `${descriptionId} ${badgeId}` : descriptionId
        }
        onChange={onSelect}
      />
      <span className={styles['product-card__content']}>
        <span id={titleId} className={styles['product-card__title']}>
          {product.title}
        </span>
        <span className={styles['product-card__price']}>
          {formatPrice(product.price)}
        </span>
        <span
          id={descriptionId}
          className={styles['product-card__description']}
        >
          {product.description}
        </span>
        {product.badge && (
          <span id={badgeId} className={styles['product-card__badge']}>
            {product.badge}
          </span>
        )}
      </span>
    </label>
  );
};
