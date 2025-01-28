import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Button from "../Button";
import TradeDialog from "../TradeDialog/TradeDialog";
import { useTradeDialog } from "../TradeDialog/TradeDialog.hooks";
import { useEthPrice } from "./EthPriceChart.hooks";

function EthPriceChart() {
  const { currentPrice, historicalPrices, error } = useEthPrice();
  const {tradeDialogOpened, toggleDialog} = useTradeDialog();

  if (!historicalPrices) {
    return (
      <div className="col-content w-full items-center justify-center flex px-[24px] h-[500px]">
        Loading...
      </div>
    );
  }

  // adds previous close price to each tick
  const modifiedHistoricalPrices = historicalPrices.map(
    (item, index, array) => {
      const previousClosePrice = index > 0 ? array[index - 1].price : undefined;
      return {
        ...item,
        previousClosePrice,
      };
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function CustomTooltip({ payload }: any) {
    if (!payload || payload.length === 0) return null;

    const currentData = payload[0].payload;
    const previousData = currentData.previousClosePrice ?? null;

    return (
      <div className="flex gap-[4px] justify-center items-center ">
        {previousData && <span className="bg-[#B9D3D3] rounded-[4px] p-[2px] text-white">Prev close</span>}
        {previousData && <span className="bg-[#B9D3D3] rounded-[4px] p-[2px] text-white">{Math.round(previousData)}</span>}
      </div>
    );
  }

  return (
    <div className="col-content w-full items-center justify-center flex flex-col px-[24px] gap-[16px]">
      {error && <span>Error occured</span>}

      <span>{currentPrice}</span>

      {historicalPrices && (
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={modifiedHistoricalPrices}>
            <defs>
              <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4caf50" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              scale="time"
              type="number"
              domain={["auto", "auto"]}
              tickFormatter={(value) => new Date(value).toISOString()}
              hide
            />
            <YAxis
              tickFormatter={(value) => `€${Math.round(value)}`}
              domain={["auto", "auto"]}
              orientation="right"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#4caf50"
              fill="url(#gradientColor)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      <Button callback={toggleDialog} buttonText="Trade" customStyles="lg:max-w-[140px]"></Button>
      
      <TradeDialog isOpen={tradeDialogOpened} onClose={toggleDialog} />
    </div>
  );
}

export default EthPriceChart;
