import { useEffect, useState } from 'react';
import { getStockList } from '../../../redux/features/stocksSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/store';
import { IndividualStock } from '../../../components';
const StockList = () => {
  const [filter, setFilter] = useState('NONE');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 15;

  const dispatch = useAppDispatch();
  const { allStocks, isLoading, error } = useAppSelector(
    (state: RootState) => state.stocks
  );

  useEffect(() => {
    dispatch(getStockList());
  }, [dispatch]);

  // run a function that gets all the stocks without a latestPrice
  const stocksWithNoLatestPrice = allStocks?.filter(
    (stock: any) => !stock.latestPrice
  );

  let displayedStocks = [...(allStocks || [])];

  // Filter by alphabet
  if (filter === 'ALPHABET') {
    displayedStocks.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Filter by symbol
  if (filter === 'SYMBOL') {
    displayedStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));
  }

  // Filter by price
  if (filter === 'PRICE H-L') {
    displayedStocks.sort((a, b) => b.latestPrice - a.latestPrice);
  }

  if (filter === 'PRICE L-H') {
    displayedStocks.sort((a, b) => a.latestPrice - b.latestPrice);
  }

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  let currentStocks = displayedStocks.slice(
    indexOfFirstStock,
    indexOfLastStock
  );

  // Apply search filter
  if (search) {
    currentStocks = displayedStocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(search.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleNext = () => {
    if (currentPage < Math.ceil(displayedStocks.length / stocksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex flex-col items-center px-4 w-full'>
      <h1 className='text-3xl font-bold'>
        Stock List (
        {allStocks &&
          stocksWithNoLatestPrice &&
          allStocks?.length - stocksWithNoLatestPrice?.length}
        )
      </h1>

      {/* Filter & Search UI */}
      <div className='my-4'>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value='NONE'>None</option>
            <option value='ALPHABET'>Alphabetical</option>
            <option value='SYMBOL'>Symbol</option>
            <option value='PRICE H-L'>Price (High to Low)</option>
            <option value='PRICE L-H'>Price (Low to High)</option>
          </select>
        </label>
        <label>
          Search:
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search stocks...'
          />
        </label>
      </div>

      {/* component to search the stock list */}
      <ul className='grid grid-cols-3 p-2 gap-2 w-full'>
        <IndividualStock
          allStocks={currentStocks || []}
          isLoading={isLoading}
        />
      </ul>
      <div>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentPage === Math.ceil(displayedStocks.length / stocksPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StockList;
