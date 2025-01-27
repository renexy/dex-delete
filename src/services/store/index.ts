import { configureStore } from '@reduxjs/toolkit';
import ethPriceReducer from '../state/ethPriceSlice';

const store = configureStore({
  reducer: {
    ethPrice: ethPriceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
