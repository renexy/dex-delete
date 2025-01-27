import EthPriceChart from "./components/EthPriceChart";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="flex flex-col h-full w-full gap-[24px]">
        <Header></Header>
        <div className="global-main-grid-layout relative">
          <EthPriceChart></EthPriceChart>
        </div>
      </div>
    </>
  );
}

export default App;
