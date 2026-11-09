import { Button } from '../../components/Button/Button';
import { PathSummary } from '../../components/PathSummary/PathSummary';
import { SelectionTotal } from '../../components/SelectionTotal/SelectionTotal';
import { StageSection } from '../../components/StageSection/StageSection';
import { stages } from '../../features/calculator/data';
import { requestContact } from '../../features/calculator/contact';
import { useCalculator } from '../../features/calculator/useCalculator';
import styles from './CalculatorPage.module.scss';

const shortcuts = [
  { href: '#master', label: 'Старт' },
  { href: '#school', label: 'Школа під ключ' },
  { href: '#brand', label: 'Власний бренд' },
];

export const CalculatorPage = () => {
  const calculator = useCalculator();

  return (
    <main className={styles.calculator} aria-label="Конструктор шляху FREZIVNA">
      <div className={styles.calculator__toolbar}>
        <div className={styles.calculator__container}>
          <nav
            className={styles.calculator__shortcuts}
            aria-label="Швидкий перехід до етапу"
          >
            {shortcuts.map((shortcut) => (
              <Button
                key={shortcut.href}
                size="small"
                className={styles.calculator__shortcut}
                href={shortcut.href}
              >
                {shortcut.label}
              </Button>
            ))}
            <Button
              size="small"
              className={styles.calculator__shortcut}
              onClick={calculator.handleClear}
            >
              Очистити
            </Button>
          </nav>
          <SelectionTotal
            count={calculator.selectedIds.length}
            totals={calculator.totals}
            isCompact
          />
        </div>
      </div>

      {stages.map((stage) => (
        <StageSection
          key={stage.id}
          stage={stage}
          selectedIds={calculator.selectedIds}
          onSelect={calculator.handleSelect}
          onClearGroup={calculator.handleClearGroup}
        />
      ))}

      <div id="my-path" className={styles.calculator__result}>
        <div className={styles['calculator__result-container']}>
          <PathSummary
            products={calculator.selectedProducts}
            totals={calculator.totals}
            onRemove={calculator.handleRemove}
            onClear={calculator.handleClear}
            onRequest={() =>
              requestContact('order', calculator.selectedProducts)
            }
          />
        </div>
      </div>
    </main>
  );
};
