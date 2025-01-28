import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";
import { updatePortfolio } from "../services/state/portfolioSlice";

export const usePortfolio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { realizedPNL, ethBalance, eurBalance, error, transactions } = useSelector((state: RootState) => state.portfolio);

  const handleBuy = (ethAmount: number, ethPrice: number) => {
    dispatch(updatePortfolio({ type: 'buy', amount: ethAmount, price: ethPrice }));
  };

  const handleSell = (ethAmount: number, ethPrice: number) => {
    dispatch(updatePortfolio({ type: 'sell', amount: ethAmount, price: ethPrice }));
  };

  return { realizedPNL, ethBalance, eurBalance, handleBuy, handleSell, error, transactions };
};
