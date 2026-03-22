// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useWatchlist } from "../../hooks/useWatchlist";
// import { useMarketData } from "../../hooks/useMarketData";

// export default function MarketCard({ title }) {
//   const { watchlist = [], toggleWatchlist } = useWatchlist();
//   const [filter, setFilter] = useState("CRYPTO");

//   const { data: coins = [], isLoading } = useMarketData(filter);

//   return (
//     <div className="bg-[#0f1116] p-5 rounded-[14px] text-white">
//       {/* Title + Filter */}
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="font-semibold">{title}</h3>

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="bg-[#151821] text-sm px-2 py-1 rounded border border-[#1e1e1e]"
//         >
//           <option value="CRYPTO">USDT</option>
//           <option value="BTC">BTC</option>
//           <option value="ETH">ETH</option>
//           <option value="BNB">BNB</option>
//         </select>
//       </div>

//       {/* Header */}
//       <div className="grid grid-cols-[2fr_1fr_1fr] opacity-60 mb-2 text-sm">
//         <span>Name</span>
//         <span>Price</span>
//         <span>24h Change</span>
//       </div>

//       {/* Coin List */}
//       <div className="max-h-[520px] overflow-y-auto scrollbar-hide">
//         {isLoading && <p className="text-gray-400">Loading...</p>}

//         {!isLoading && coins.length === 0 && (
//           <p className="text-gray-400">No market data</p>
//         )}

//         {coins.slice(0, 20).map((coin, i) => {
//           const change = Number(coin.priceChangePercent || 0).toFixed(2);

//           const coinSymbol = coin.symbol
//             ?.replace("USDT", "")
//             ?.replace("BTC", "")
//             ?.replace("ETH", "")
//             ?.replace("BNB", "")
//             ?.toLowerCase();

//           const isSaved = watchlist.includes(coin.symbol);

//           return (
//             <Link
//               key={coin.symbol}
//               to={`/trade/${coin.symbol}`}
//               className="no-underline text-inherit"
//             >
//               <div className="grid grid-cols-[2fr_1fr_1fr] items-center p-2.5 cursor-pointer border-b border-[#1e1e1e] hover:bg-[#151821] transition">
//                 <div className="flex items-center gap-3">
//                   <span className="w-5 text-gray-400">{i + 1}</span>

//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <span className="w-5 text-gray-400">{i + 1}</span>

                
//                   <span
//                     onClick={(e) => {
//                       e.preventDefault();      // prevent link navigation
//                       e.stopPropagation();     // stop event from reaching parent Link
//                       toggleWatchlist(coin.symbol);
//                     }}
//                     className="cursor-pointer"
//                   >
//                     {isSaved ? "⭐" : "☆"}
//                   </span>

//                   {/* Coin icon */}
//                   <img
//                     src={`https://cryptoicons.org/api/icon/${coinSymbol}/24`}
//                     alt={coinSymbol}
//                     className="w-5 h-5"
//                   />

//                   <span className="font-medium">{coin.symbol}</span>
//                 </div>

//                 {/* Price */}
//                 <span className="tabular-nums">
//                   ${Number(coin.lastPrice || 0).toFixed(4)}
//                 </span>

//                 {/* Change */}
//                 <span
//                   className={change > 0 ? "text-[#16c784]" : "text-[#ea3943]"}
//                 >
//                   {change}%
//                 </span>
//               </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useWatchlist } from "../../hooks/useWatchlist";

function CoinIcon({ symbol }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-5 h-5 rounded-full bg-[#2a2d3a] flex items-center justify-center text-[9px] font-bold text-gray-400">
        {symbol.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/${symbol}.svg`}
      alt={symbol}
      className="w-5 h-5"
      onError={() => setFailed(true)}
    />
  );
}

export default function MarketCard({ title, sortBy = "volume" }) {
  const { watchlist = [], toggleWatchlist } = useWatchlist();
  const [filter, setFilter] = useState("USDT");
  const [coins, setCoins] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // close previous connection
    if (wsRef.current) wsRef.current.close();

    wsRef.current = new WebSocket("wss://data-stream.binance.vision/ws/!ticker@arr");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // filter by selected market
      const filtered = data.filter((coin) => coin.s.endsWith(filter));

      let sorted;
      if (sortBy === "gainers") {
        sorted = filtered.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
      } else if (sortBy === "losers") {
        sorted = filtered.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));
      } else {
        // volume / hot
        sorted = filtered.sort((a, b) => parseFloat(b.q) - parseFloat(a.q));
      }

      setCoins(sorted.slice(0, 20));
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [filter, sortBy]); // reconnect when filter or sortBy changes

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
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="BNB">BNB</option>
        </select>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr] opacity-60 mb-2 text-sm px-2">
        <span>Name</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h Change</span>
      </div>

      {/* Coin List */}
      <div className="coin-list max-h-[520px] overflow-y-auto overflow-x-hidden">
        {coins.length === 0 && (
          <p className="text-gray-400 text-sm p-2">Connecting...</p>
        )}

        {coins.map((coin, i) => {
          const change = parseFloat(coin.P).toFixed(2);
          const price = parseFloat(coin.c);

          const coinSymbol = coin.s
            .replace(/USDT$|BTC$|ETH$|BNB$/i, "")
            .toLowerCase();

          const isSaved = watchlist.includes(coin.s);

          return (
            <Link
              key={coin.s}
              to={`/trade/${coin.s}`}
              className="no-underline text-inherit"
            >
              <div className="grid grid-cols-[2fr_1fr_1fr] items-center p-2.5 cursor-pointer border-b border-[#1e1e1e] hover:bg-[#151821] transition">
                {/* Left section */}
                <div className="flex items-center gap-2">
                  <span className="w-4 text-gray-400 text-xs">{i + 1}</span>

                  {/* Watchlist toggle */}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWatchlist(coin.s);
                    }}
                    className="cursor-pointer text-sm"
                  >
                    {isSaved ? "⭐" : "☆"}
                  </span>

                  <CoinIcon symbol={coinSymbol} />

                  <span className="font-medium text-sm">{coin.s}</span>
                </div>

                {/* Price */}
                <span className="tabular-nums text-right text-sm">
                  ${price < 0.01
                    ? price.toFixed(6)
                    : price < 1
                    ? price.toFixed(4)
                    : price.toFixed(2)}
                </span>

                {/* Change */}
                <span className={`text-right text-sm ${change > 0 ? "text-[#16c784]" : "text-[#ea3943]"}`}>
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}