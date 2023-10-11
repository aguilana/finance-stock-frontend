import { StockType } from '../../types/types';

interface IndividualStockProps {
  allStocks?: StockType[];
  isLoading?: boolean;
}

const IndividualStock: React.FC<IndividualStockProps> = ({
  allStocks,
  isLoading,
}) => {
  return allStocks?.map((stock: any) =>
    isLoading ? (
      <div className='p-4 border-[1px] bg-slate-200 bg-opacity-70 border-black hover:text-white hover:bg-black hover:cursor-pointer transition-all duration-300 ease-in-out animate-pulse'>
        Loading...
      </div>
    ) : (
      <li
        key={stock.symbol + stock?.id}
        className='p-4 border-[1px] bg-slate-200 bg-opacity-70 border-black hover:text-white hover:bg-black hover:cursor-pointer transition-all duration-300 ease-in-out'
      >
        <p>
          {stock.name} ({stock.symbol}) - ${stock.latestPrice}
        </p>
      </li>
    )
  );
};
export default IndividualStock;
