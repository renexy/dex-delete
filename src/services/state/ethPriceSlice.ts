import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCurrentEthPrice,
  fetchHistoricalEthPrice,
} from "../api/fetchPrice";

export interface EthPriceState {
  historicalPrices: { time: number; price: number }[] | undefined;
  currentPrice: number | undefined;
  previousClosePrice: number | undefined;
  error: string | undefined;
  historicalDataFetched: boolean;
}

export const fetchCurrentEthPriceAsync = createAsyncThunk(
  "ethPrice/fetchCurrentEthPrice",
  async () => {
    const currentPrice = await fetchCurrentEthPrice();
    return currentPrice;
  }
);

export const fetchHistoricalEthPriceAsync = createAsyncThunk(
  "ethPrice/fetchHistoricalEthPrice",
  async () => {
    const historicalPrices = await fetchHistoricalEthPrice();
    return historicalPrices;
  }
);

const initialState: EthPriceState = {
  historicalPrices: undefined,
  currentPrice: undefined,
  previousClosePrice: undefined,
  error: undefined,
  historicalDataFetched: false,
};

const ethPriceSlice = createSlice({
  name: "ethPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentEthPriceAsync.fulfilled, (state, action) => {
        state.currentPrice = action.payload;

        if (state.historicalPrices) {
          const newPrice = {
            time: new Date().getTime(),
            price: action.payload,
          };
          state.historicalPrices = [...state.historicalPrices, newPrice];
        }
      })
      .addCase(fetchCurrentEthPriceAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchHistoricalEthPriceAsync.fulfilled, (state, action) => {
        state.historicalPrices = action.payload;
        state.historicalDataFetched = true;
      })
      .addCase(fetchHistoricalEthPriceAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default ethPriceSlice.reducer;
