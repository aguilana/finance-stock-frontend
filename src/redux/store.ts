import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import stocksReducer from '../redux/features/stocksSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stocksReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    if (import.meta.env.VITE_ENV !== 'production') {
      middleware.push(logger);
    }
    return middleware;
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;
export default store;
