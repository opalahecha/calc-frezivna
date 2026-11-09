import { Button } from '../Button/Button';
import type { ProductGroup, Stage } from '../../features/calculator/types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './StageSection.module.scss';

interface Props {
  stage: Stage;
  selectedIds: string[];
  onSelect: (group: ProductGroup, productId: string) => void;
  onClearGroup: (group: ProductGroup) => void;
}

export const StageSection = ({
  stage,
  selectedIds,
  onSelect,
  onClearGroup,
}: Props) => {
  return (
    <section
      id={stage.id}
      className={styles.stage}
      aria-labelledby={`${stage.id}-title`}
    >
      <div className={styles.stage__container}>
        <div className={styles.stage__heading}>
          <span className={styles.stage__number} aria-hidden="true">
            {stage.number}
          </span>
          <div>
            <h2 id={`${stage.id}-title`} className={styles.stage__title}>
              {stage.title}
            </h2>
            <p className={styles.stage__description}>{stage.description}</p>
          </div>
        </div>

        <div className={styles.stage__groups}>
          {stage.groups.map((group) => {
            const hasSelection = group.products.some((product) =>
              selectedIds.includes(product.id),
            );

            return (
              <fieldset key={group.id} className={styles.stage__group}>
                <legend className={styles.stage__legend}>
                  <span className={styles.stage__label}>{group.title}</span>
                  <span className={styles.stage__hint}>{group.hint}</span>
                </legend>
                <div className={styles.stage__cards}>
                  {group.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      groupId={group.id}
                      isSelected={selectedIds.includes(product.id)}
                      isSingle={group.selection === 'single'}
                      onSelect={() => onSelect(group, product.id)}
                    />
                  ))}
                </div>
                {hasSelection && (
                  <Button
                    size="small"
                    className={styles.stage__clear}
                    onClick={() => onClearGroup(group)}
                    aria-label={`Очистити вибір у групі «${group.title}»`}
                  >
                    Очистити вибір
                  </Button>
                )}
              </fieldset>
            );
          })}
        </div>
      </div>
    </section>
  );
};
