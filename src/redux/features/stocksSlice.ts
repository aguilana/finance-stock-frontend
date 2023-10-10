import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../common';
const { API_ENDPOINT } = config;
import { StockState } from '../../types/types';
import axios from 'axios';
axios.defaults.withCredentials = true;

// pass with credentials!

const initialState: StockState = {
  allStocks: [],
  isLoading: true,
  error: null,
};

export const getStockList = createAsyncThunk(
  'stocks/getStockList',
  async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/stocks/list`);
      console.log('data in slice', data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getHistoricalPriceOfStock = createAsyncThunk(
  'stocks/getHistoricalPriceOfStock',
  async (symbol: string) => {
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/stocks/historicalPrices/${symbol}`
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getLatestPriceOfAllStocks = createAsyncThunk(
  'stocks/getLatestPriceOfAllStocks',
  async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/stocks/latest`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStockList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStockList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allStocks = action.payload;
    });
    builder.addCase(getStockList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getHistoricalPriceOfStock.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHistoricalPriceOfStock.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allStocks = action.payload;
    });
    builder.addCase(getHistoricalPriceOfStock.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const selectAllStocks = (state: { stocks: StockState }) =>
  state.stocks.allStocks;
export default stockSlice.reducer;
