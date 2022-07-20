import StockPrices from './components/stockPrices'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Stock Ticker
        </p>
      </header>
      <StockPrices />
    </div>
  );
}

export default App;
