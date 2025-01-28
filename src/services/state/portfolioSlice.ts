import { createSlice } from "@reduxjs/toolkit";

interface Transaction {
  type: "buy" | "sell";
  amount: number;
  price: number;
  datetime?: string;
}

interface PortfolioState {
  ethBalance: number;
  eurBalance: number;
  realizedPNL: number;
  transactions: Transaction[];
}

interface UpdatePortfolioAction {
  payload: Transaction;
}

const initialState: PortfolioState = {
  ethBalance: 0,
  eurBalance: 10000,
  realizedPNL: 0,
  transactions: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updatePortfolio: (state, action: UpdatePortfolioAction) => {
      const { type, amount, price } = action.payload;

      if (type === "buy") {
        const totalCost = amount * price;
        if (state.eurBalance < totalCost) {
          console.error("Insufficient EUR balance");
          return;
        }
        state.eurBalance -= totalCost;
        state.ethBalance += amount;
        state.transactions.push({ type, amount, price, datetime: new Date().toISOString() });
      } else if (type === "sell") {
        if (state.ethBalance < amount) {
          console.error("Insufficient ETH balance");
          return;
        }

        let realizedProfitLoss = 0;
        let remainingAmount = amount;

        state.transactions.forEach((transaction) => {
          if (remainingAmount <= 0) return;

          if (transaction.type === "buy" && transaction.amount > 0) {
            const tradeAmount = Math.min(transaction.amount, remainingAmount);
            const profit = tradeAmount * (price - transaction.price);

            realizedProfitLoss += profit;
            transaction.amount -= tradeAmount;
            remainingAmount -= tradeAmount;
          }
        });

        state.realizedPNL += realizedProfitLoss;

        state.ethBalance -= amount;
        state.eurBalance += amount * price;
        state.transactions.push({ type, amount, price, datetime: new Date().toISOString() });
      }
    },
  },
});

export const { updatePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
