import { Button } from '../Button/Button';
import type { PriceTotals, Product } from '../../features/calculator/types';
import { formatPrice } from '../../features/calculator/utils';
import { SelectionTotal } from '../SelectionTotal/SelectionTotal';
import styles from './PathSummary.module.scss';

interface Props {
  products: Product[];
  totals: PriceTotals;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onRequest: () => void;
}

export const PathSummary = ({
  products,
  totals,
  onRemove,
  onClear,
  onRequest,
}: Props) => {
  const isEmpty = products.length === 0;

  return (
    <section className={styles.summary} aria-labelledby="summary-title">
      <div className={styles.summary__content}>
        <p className={styles.summary__eyebrow}>Підсумок</p>
        <h2 id="summary-title" className={styles.summary__title}>
          Мій шлях
        </h2>
        <p className={styles.summary__status} role="status">
          Обрано: {products.length}
        </p>
        {isEmpty ? (
          <>
            <p className={styles.summary__empty}>
              Поки що порожньо. Обери продукти в слотах вище, і вони з’являться
              тут.
            </p>
            <Button uppercase onClick={onRequest} disabled>
              Залишити заявку
            </Button>
          </>
        ) : (
          <SelectionTotal
            count={products.length}
            totals={totals}
            onRequest={onRequest}
          />
        )}

        {!isEmpty && (
          <details className={styles.summary__details}>
            <summary className={styles.summary__toggle}>
              Переглянути обране ({products.length})
            </summary>
            <ul className={styles.summary__list}>
              {products.map((product) => (
                <li key={product.id} className={styles.summary__item}>
                  <div>
                    <p className={styles.summary__name}>{product.title}</p>
                    <p className={styles.summary__price}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    aria-label={`Прибрати «${product.title}»`}
                    onClick={() => onRemove(product.id)}
                  >
                    <span aria-hidden="true">×</span>
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              size="small"
              className={styles.summary__clear}
              onClick={onClear}
            >
              Очистити все
            </Button>
          </details>
        )}

        <p className={styles.summary__footnote}>
          Будь-який продукт додає тебе до безкоштовного чату FREZIVNA NAIL CHAT.
        </p>
      </div>
    </section>
  );
};
