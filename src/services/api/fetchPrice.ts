import axios from 'axios';

const binanceApi = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
});

const TIME_INTERVAL = '30m';
const LIMIT = 50;
const SYMBOL = 'ETHUSDT'

export const fetchHistoricalEthPrice = async () => {
  try {
    const response = await binanceApi.get('/klines', {
      params: {
        symbol: SYMBOL,
        interval: TIME_INTERVAL,
        limit: LIMIT
      },
    });
    return response.data.map((priceData: number[]) => ({
      // @index0: time
      time: priceData[0],
      // @index4: close price
      price: priceData[4],
    }));
  } catch (error) {
    console.error('fetchHistoricalEthPrice api error', error);
    throw error;
  }
};

export const fetchCurrentEthPrice = async () => {
  try {
    const response = await binanceApi.get('/ticker/price', {
      params: {
        symbol: SYMBOL,
      },
    });
    return response.data.price;
  } catch (error) {
    console.error('fetchCurrentEthPrice api error', error);
    throw error;
  }
};
