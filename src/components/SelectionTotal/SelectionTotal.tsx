import { Button } from '../Button/Button';
import type { PriceTotals } from '../../features/calculator/types';
import { getTotalPriceLines } from '../../features/calculator/utils';
import styles from './SelectionTotal.module.scss';

interface Props {
  count: number;
  totals: PriceTotals;
  isCompact?: boolean;
  onRequest?: () => void;
}

export const SelectionTotal = ({
  count,
  totals,
  isCompact = false,
  onRequest,
}: Props) => {
  const lines = getTotalPriceLines(totals);
  const isEmpty = count === 0;

  return (
    <div
      className={[styles.total, isCompact ? styles['total--compact'] : ''].join(
        ' ',
      )}
    >
      <div className={styles.total__content}>
        <div className={styles.total__heading}>
          <span>Сума</span>
          <span>Обрано: {count}</span>
        </div>
        <p className={styles.total__amount}>
          {isEmpty ? 'Обери свій шлях' : lines.primary}
        </p>
        {!isEmpty && lines.secondary && (
          <p className={styles.total__secondary}>{lines.secondary}</p>
        )}
      </div>
      {isCompact ? (
        <Button fullWidth uppercase href="#my-path">
          Мій шлях
        </Button>
      ) : (
        <Button fullWidth uppercase onClick={onRequest} disabled={isEmpty}>
          Залишити заявку
        </Button>
      )}
      {!isCompact && (
        <p className={styles.total__note}>
          {isEmpty
            ? 'Познач продукти вище, щоб зібрати власний план.'
            : 'Орієнтовна вартість. Остаточну суму узгодимо після консультації.'}
          {!isEmpty && totals.quoteCount > 0 && (
            <> Позицій для індивідуального розрахунку: {totals.quoteCount}.</>
          )}
        </p>
      )}
    </div>
  );
};
