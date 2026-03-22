import { Link } from "react-router-dom";
import { useState } from "react";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useMarketData } from "../../hooks/useMarketData";

export default function MarketCard({ title }) {
  const { watchlist = [], toggleWatchlist } = useWatchlist();
  const [filter, setFilter] = useState("CRYPTO");

  const { data: coins = [], isLoading } = useMarketData(filter);

  return (
    <div className="bg-[#0f1116] p-5 rounded-[14px] text-white">
      {/* Title + Filter */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#151821] text-sm px-2 py-1 rounded border border-[#1e1e1e]"
        >
          <option value="CRYPTO">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="BNB">BNB</option>
        </select>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr] opacity-60 mb-2 text-sm">
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
      </div>

      {/* Coin List */}
      <div className="max-h-[520px] overflow-y-auto scrollbar-hide">
        {isLoading && <p className="text-gray-400">Loading...</p>}

        {!isLoading && coins.length === 0 && (
          <p className="text-gray-400">No market data</p>
        )}

        {coins.slice(0, 20).map((coin, i) => {
          const change = Number(coin.priceChangePercent || 0).toFixed(2);

          const coinSymbol = coin.symbol
            ?.replace("USDT", "")
            ?.replace("BTC", "")
            ?.replace("ETH", "")
            ?.replace("BNB", "")
            ?.toLowerCase();

          const isSaved = watchlist.includes(coin.symbol);

          return (
            <Link
              key={coin.symbol}
              to={`/trade/${coin.symbol}`}
              className="no-underline text-inherit"
            >
              <div className="grid grid-cols-[2fr_1fr_1fr] items-center p-2.5 cursor-pointer border-b border-[#1e1e1e] hover:bg-[#151821] transition">
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <span className="w-5 text-gray-400">{i + 1}</span>

                  {/* Watchlist toggle */}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWatchlist(coin.symbol);
                    }}
                    className="cursor-pointer"
                  >
                    {isSaved ? "⭐" : "☆"}
                  </span>

                  {/* Coin icon */}
                  <img
                    src={`https://cryptoicons.org/api/icon/${coinSymbol}/24`}
                    alt={coinSymbol}
                    className="w-5 h-5"
                  />

                  <span className="font-medium">{coin.symbol}</span>
                </div>

                {/* Price */}
                <span className="tabular-nums">
                  ${Number(coin.lastPrice || 0).toFixed(4)}
                </span>

                {/* Change */}
                <span
                  className={change > 0 ? "text-[#16c784]" : "text-[#ea3943]"}
                >
                  {change}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
