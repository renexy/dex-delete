import { configureStore } from '@reduxjs/toolkit';
import ethPriceReducer from '../state/ethPriceSlice';
import portfolioSliceReducer from '../state/portfolioSlice';

const store = configureStore({
  reducer: {
    ethPrice: ethPriceReducer,
    portfolio: portfolioSliceReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
