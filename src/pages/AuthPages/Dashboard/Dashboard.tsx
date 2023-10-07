import { useEffect } from 'react';
import { getAllStocks } from '../../../redux/features/stocksSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/store';

interface Stock {
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
  userPortfolio: {
    quantity: number;
  };
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { allStocks } = useAppSelector((state: RootState) => state.stocks);
  useEffect(() => {
    dispatch(getAllStocks());
  }, [dispatch]);

  console.log('ALL STOCKS IN DASHBOARD', allStocks);

  return (
    <div>
      <h1>Dashboard for {user?.displayName}</h1>
      <h2> All your stocks </h2>
      <ul>
        {allStocks?.map((stock: any) => (
          <li key={stock.id} className='py-4'>
            <p>
              Name: {stock.name} ({stock.symbol})
            </p>
            <p>Quantity: {stock?.userPortfolio.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
