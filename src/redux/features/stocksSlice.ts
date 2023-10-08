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

// export const getAllStocks = createAsyncThunk('stocks/getAll', async () => {
//   const token = localStorage.getItem('token');
//   console.log('token in frontend!!!!', token);
//   try {
//     const { data } = await axios.get(`${API_ENDPOINT}/stocks`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log('----------------------------------------------');
//     console.log('data COMING FROM THE BACKEND!!!', data);
//     console.log('----------------------------------------------');

//     return data;
//   } catch (error) {
//     return error;
//   }
// });

export const getStockList = createAsyncThunk(
  'stocks/getStockList',
  async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/stocks/list`);
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
    // builder.addCase(getAllStocks.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getAllStocks.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.allStocks = action.payload;
    // });
    // builder.addCase(getAllStocks.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
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
  },
});

export const selectAllStocks = (state: { stocks: StockState }) =>
  state.stocks.allStocks;
export default stockSlice.reducer;
