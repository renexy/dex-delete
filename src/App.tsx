import EthPriceChart from "./components/EthPriceChart/EthPriceChart";
import Header from "./components/Header";
import TradeHistory from "./components/TradeHistory/TradeHistory";

function App() {
  return (
    <>
      <div className="flex flex-col h-full w-full gap-[24px] mb-[24px]">
        <Header></Header>
        <div className="global-main-grid-layout relative">
          <EthPriceChart></EthPriceChart>
        </div>
        <div className="global-main-grid-layout relative w-full">
          <TradeHistory></TradeHistory>
        </div>
      </div>
    </>
  );
}

export default App;
