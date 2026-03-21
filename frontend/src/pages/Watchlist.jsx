import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useMarketData } from "../hooks/useMarketData";

export default function Watchlist() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const { data = [] } = useMarketData("CRYPTO");

  const watchlistCoins = data.filter((coin) => watchlist.includes(coin.symbol));
  return (
    <div className="max-w-full mx-auto px-6 py-10 text-white bg-[#0f1116] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">⭐ My Watchlist</h2>
      {watchlistCoins.length === 0 && (
        <p className="opacity-60 italic mb-6">No coins added to watchlist</p>
      )}
      <div className="grid grid-cols-[1fr_1fr_1fr_120px] opacity-60 font-semibold border-b border-gray-700 pb-2 mb-2">
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
        <span></span>
      </div>
      {watchlistCoins.map((coin) => {
        const change = Number(coin.priceChangePercent).toFixed(2);
        return (
          <div
            key={coin.symbol}
            className="grid grid-cols-[1fr_1fr_1fr_120px] py-3 border-b border-gray-800 items-center hover:bg-gray-900 transition">
            <Link
              to={`/trade/${coin.symbol}`}
              className="text-white font-medium hover:text-yellow-400 transition" >
              {coin.symbol}
            </Link>
            <span className="font-medium">${Number(coin.lastPrice).toFixed(4)}</span>
            <span
              className={`font-medium ${
                change > 0 ? "text-green-500" : "text-red-500"
              }`} >
              {change}%
            </span>
            <button
              onClick={() => toggleWatchlist(coin.symbol)}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg font-semibold transition transform hover:scale-105">
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}