import { SerializedError } from '@reduxjs/toolkit';

export interface User {
  email: string | null;
  displayName: string | null;
  isAdmin: boolean | {};
}

export interface StockType {
  symbol: string;
  name: string;
  latestPrice: number;
  marketCap: number;
  volume: number;
  open: number;
  close: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  changeOverTime: number;
  changeOverTimePercent: number;
  highestPrice: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: SerializedError | null;
}

export interface StockState {
  allStocks: StockType[] | null;
  isLoading: boolean;
  error: SerializedError | null;
}

export interface AuthFormProps {
  name: string;
  form: string;
}
