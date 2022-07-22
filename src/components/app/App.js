import AppHeader from "../appHeader/AppHeader";
import Calculator from "../currencyExchangeCalculator/Calculator";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundary>
          <Calculator />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
