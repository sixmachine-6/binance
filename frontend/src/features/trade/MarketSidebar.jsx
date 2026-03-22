// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

// const fetchMarkets = async () => {
//   const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
//   const data = await res.json();
//   return data.filter((c) => c.symbol.endsWith("USDT")).slice(0, 10);
// };

// export default function MarketSidebar() {
//   const { data = [] } = useQuery({
//     queryKey: ["markets"],
//     queryFn: fetchMarkets,
//     refetchInterval: 1000,
//   });

//   return (
//     <div className="flex flex-col h-full p-4 border-l border-gray-800 bg-[#0f1116] text-white">
//       <div className="grid grid-cols-3 text-gray-400 text-xs mb-2">
//         <span>Pair</span>
//         <span>Last Price</span>
//         <span>24h Chg</span>
//       </div>

//       <div className="flex-1 overflow-y-auto space-y-[2px]">
//         {data.map((c) => {
//           const coin = c.symbol.replace("USDT", "").toLowerCase();
//           const change = Number(c.priceChangePercent).toFixed(2);

//           return (
//             <Link key={c.symbol} to={`/trade/${c.symbol}`}>
//               <div className="grid grid-cols-3 items-center text-xs py-[2px] hover:bg-gray-800 rounded px-1">
//                 <div className="flex items-center gap-2">
//                   {/* Optional coin icon */}
//                   {/* <img
//                     src={`https://cryptoicons.org/api/icon/${coin}/20`}
//                     alt={coin}
//                     className="w-4 h-4"
//                   /> */}
//                   <span>{c.symbol}</span>
//                 </div>

//                 <span className="text-gray-300">{Number(c.lastPrice).toFixed(3)}</span>

//                 <span className={change > 0 ? "text-[#16c784]" : "text-[#ea3943]"}>
//                   {change}%
//                 </span>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function CoinIcon({ symbol }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-4 h-4 rounded-full bg-[#2a2d3a] flex items-center justify-center text-[8px] font-bold text-gray-400 flex-shrink-0">
        {symbol.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@master/svg/color/${symbol}.svg`}
      alt={symbol}
      className="w-4 h-4 flex-shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

export default function MarketSidebar() {
  const [coins, setCoins] = useState([]);
  const [filter, setFilter] = useState("USDT");
  const wsRef = useRef(null);

  useEffect(() => {
    if (wsRef.current) wsRef.current.close();

    wsRef.current = new WebSocket(
      "wss://data-stream.binance.vision/ws/!ticker@arr"
    );

    wsRef.current.onopen = () => console.log("✅ Sidebar WebSocket connected");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const filtered = data
        .filter((coin) => coin.s.endsWith(filter))
        .sort((a, b) => parseFloat(b.q) - parseFloat(a.q))
        .slice(0, 20);

      setCoins(filtered);
    };

    wsRef.current.onerror = (err) => console.log("❌ WebSocket error", err);
    wsRef.current.onclose = () => console.log("❌ WebSocket closed");

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [filter]);

  return (
    <div className="flex flex-col h-full p-4 border-l border-gray-800 bg-[#0f1116] text-white">

      {/* Filter */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-[#151821] text-xs px-2 py-1 rounded border border-[#1e1e1e] mb-3 outline-none text-white"
      >
        <option value="USDT">USDT</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="BNB">BNB</option>
      </select>

      {/* Header */}
      <div className="grid grid-cols-3 text-gray-400 text-xs mb-2 px-1">
        <span>Pair</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h Chg</span>
      </div>

      {/* List */}
      <div className="coin-list flex-1 overflow-y-auto overflow-x-hidden">
        {coins.length === 0 && (
          <p className="text-gray-400 text-xs p-2">Connecting...</p>
        )}

        {coins.map((c) => {
          const coinSymbol = c.s
            .replace(/USDT$|BTC$|ETH$|BNB$/i, "")
            .toLowerCase();

          const change = parseFloat(c.P).toFixed(2);
          const price = parseFloat(c.c);

          return (
            <Link
              key={c.s}
              to={`/trade/${c.s}`}
              className="no-underline text-inherit"
            >
              <div className="grid grid-cols-3 items-center text-xs py-2 px-1 hover:bg-[#151821] border-b border-[#1e1e1e] transition">

                {/* Pair */}
                <div className="flex items-center gap-2">
                  <CoinIcon symbol={coinSymbol} />
                  <span className="text-white truncate">{c.s}</span>
                </div>

                {/* Price */}
                <span className="text-gray-300 text-right tabular-nums">
                  ${price < 0.01
                    ? price.toFixed(6)
                    : price < 1
                    ? price.toFixed(4)
                    : price.toFixed(2)}
                </span>

                {/* Change */}
                <span className={`text-right ${parseFloat(change) > 0 ? "text-[#16c784]" : "text-[#ea3943]"}`}>
                  {parseFloat(change) > 0 ? "+" : ""}{change}%
                </span>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}