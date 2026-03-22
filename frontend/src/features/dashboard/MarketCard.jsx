import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useWatchlist } from "../../hooks/useWatchlist";
import { useMarketData } from "../../hooks/useMarketData";

export default function MarketCard({ title, sortBy = "volume" }) {
  const { watchlist = [], toggleWatchlist } = useWatchlist();

  const [filter, setFilter] = useState("CRYPTO");
  const wsRef = useRef(null);

  const { data: coins = [], isLoading } = useMarketData(filter);

  const [liveCoins, setLiveCoins] = useState([]);

  // Load initial coins from React Query
  useEffect(() => {
    if (coins.length) {
      setLiveCoins(coins);
    }
  }, [coins]);

  // WebSocket price updates
  useEffect(() => {
    wsRef.current = new WebSocket(
      "wss://data-stream.binance.vision/ws/!ticker@arr",
    );

    wsRef.current.onmessage = (event) => {
      const updates = JSON.parse(event.data);

      setLiveCoins((prev) => {
        const map = new Map(prev.map((c) => [c.symbol || c.s, c]));

        updates.forEach((u) => {
          if (!map.has(u.s)) return;

          const old = map.get(u.s);

          map.set(u.s, {
            ...old,
            symbol: u.s,
            lastPrice: u.c,
            priceChangePercent: u.P,
            quoteVolume: u.q,
          });
        });

        return Array.from(map.values());
      });
    };

    return () => wsRef.current?.close();
  }, []);

  // Sorting logic
  const sortedCoins = [...liveCoins].sort((a, b) => {
    if (sortBy === "gainers")
      return (
        parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent)
      );

    if (sortBy === "losers")
      return (
        parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent)
      );

    return parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume);
  });

  const topCoins = sortedCoins.slice(0, 20);

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
        {isLoading && <p className="text-gray-400">Loading market...</p>}

        {topCoins.map((coin, i) => {
          const symbol = coin.symbol || coin.s;

          const change = Number(coin.priceChangePercent).toFixed(2);

          const price = Number(coin.lastPrice);

          const coinSymbol = symbol
            .replace(/USDT$|BTC$|ETH$|BNB$/i, "")
            .toLowerCase();

          // ICON FALLBACK LOGIC
          const iconSources = [
            `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/${coinSymbol}.svg`,
            `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/white/${coinSymbol}.svg`,
            `https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coinSymbol}.png`,
          ];

          const isSaved = watchlist.includes(symbol);

          return (
            <Link
              key={symbol}
              to={`/trade/${symbol}`}
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
                      toggleWatchlist(symbol);
                    }}
                    className="cursor-pointer"
                  >
                    {isSaved ? "⭐" : "☆"}
                  </span>

                  {/* Icon */}
                  <img
                    src={iconSources[0]}
                    alt={coinSymbol}
                    className="h-4 w-4"
                    onError={(e) => {
                      const sources = iconSources;
                      const currentIndex = sources.indexOf(e.target.src);

                      if (currentIndex < sources.length - 1) {
                        e.target.src = sources[currentIndex + 1];
                      } else {
                        e.target.src =
                          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/generic.svg";
                      }
                    }}
                  />

                  <span className="font-medium">{symbol}</span>
                </div>

                {/* Price */}
                <span className="tabular-nums">
                  $
                  {price < 0.01
                    ? price.toFixed(6)
                    : price < 1
                      ? price.toFixed(4)
                      : price.toFixed(2)}
                </span>

                {/* Change */}
                <span
                  className={change > 0 ? "text-[#16c784]" : "text-[#ea3943]"}
                >
                  {change > 0 ? "+" : ""}
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
