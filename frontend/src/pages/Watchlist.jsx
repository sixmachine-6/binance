import { Link } from "react-router-dom";
import { useWatchlist } from "../hooks/useWatchlist";
import { useMarketData } from "../hooks/useMarketData";

export default function Watchlist() {
  const { watchlist = [], toggleWatchlist } = useWatchlist();
  const { data = [], isLoading } = useMarketData("CRYPTO");

  // ensure arrays exist
  const watchlistCoins = data.filter((coin) =>
    watchlist?.includes(coin.symbol),
  );

  return (
    <div className="p-10 text-white bg-[#1d2631] min-h-screen">
      <h2 className="text-2xl font-bold mb-6">⭐ My Watchlist</h2>

      {/* Loading state */}
      {isLoading && <p className="text-gray-400">Loading market data...</p>}

      {/* Empty watchlist */}
      {!isLoading && watchlistCoins.length === 0 && (
        <div className="bg-gray-900 p-6 rounded-lg text-gray-400">
          No coins added to watchlist
        </div>
      )}

      {/* Table Header */}
      {watchlistCoins.length > 0 && (
        <div className="grid grid-cols-4 text-gray-400 mb-3 text-sm">
          <span>Name</span>
          <span>Price</span>
          <span>24h Change</span>
          <span></span>
        </div>
      )}

      {/* Rows */}
      <div className="space-y-2">
        {watchlistCoins.map((coin) => {
          const change = Number(coin.priceChangePercent || 0).toFixed(2);

          return (
            <div
              key={coin.symbol}
              className="grid grid-cols-4 items-center bg-gray-900 p-3 rounded-lg"
            >
              <Link
                to={`/trade/${coin.symbol}`}
                className="hover:text-blue-400"
              >
                {coin.symbol}
              </Link>

              <span>${Number(coin.lastPrice || 0).toFixed(4)}</span>

              <span className={change > 0 ? "text-green-400" : "text-red-400"}>
                {change}%
              </span>

              <button
                onClick={() => toggleWatchlist(coin.symbol)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xl "
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
