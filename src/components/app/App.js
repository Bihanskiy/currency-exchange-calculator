import AppHeader from "../appHeader/AppHeader";
import CurrencyProvider from '../currencyContext/CurrencyProvider';
import Calculator from "../currencyExchangeCalculator/Calculator";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


function App() {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <div className="app">
          <AppHeader />
          <main>
              <Calculator />
          </main>
        </div>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}

export default App;
