import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";
import { useEffect } from "react";
import {
  fetchCurrentEthPriceAsync,
  fetchHistoricalEthPriceAsync,
} from "../services/state/ethPriceSlice";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function EthPriceChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPrice, historicalDataFetched, historicalPrices, error } = useSelector(
    (state: RootState) => state.ethPrice
  );

  useEffect(() => {
    if (!historicalDataFetched) {
      dispatch(fetchHistoricalEthPriceAsync());
    }
    const intervalId = setInterval(async () => {
      dispatch(fetchCurrentEthPriceAsync());
    }, 10000);
    return () => clearInterval(intervalId);
  }, [historicalDataFetched, dispatch]);

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
      <div className="TODO">
        {previousData && <p>{`Prev close: ${Math.round(previousData)}`}</p>}
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
    </div>
  );
}

export default EthPriceChart;
