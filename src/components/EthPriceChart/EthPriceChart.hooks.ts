import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import { fetchCurrentEthPriceAsync, fetchHistoricalEthPriceAsync } from "../../services/state/ethPriceSlice";

export const useEthPrice = () => {
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

  return { currentPrice, historicalPrices, error, historicalDataFetched };
};
