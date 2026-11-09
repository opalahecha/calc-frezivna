import { CalculatorPage } from './modules/CalculatorPage/CalculatorPage';
import { useIframeHeight } from './hooks/useIframeHeight';

export const App = () => {
  useIframeHeight();

  return <CalculatorPage />;
};
