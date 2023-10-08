import { useEffect } from 'react';
import { getStockList } from '../../../redux/features/stocksSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/store';
const StockList = () => {
  const dispatch = useAppDispatch();
  const { allStocks } = useAppSelector((state: RootState) => state.stocks);

  useEffect(() => {
    dispatch(getStockList());
  }, [dispatch]);

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {allStocks?.map((stock: any) => (
          <li key={stock.id} className='py-4'>
            <p>
              Name: {stock.name} ({stock.symbol})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
