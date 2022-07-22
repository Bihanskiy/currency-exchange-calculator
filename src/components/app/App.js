import AppHeader from "../appHeader/AppHeader";
import Calculator from "../currencyExchangeCalculator/Calculator";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Calculator />
        <br />
      </main>
    </div>
  );
}

export default App;
