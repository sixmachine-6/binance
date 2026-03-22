import { useQuery } from "@tanstack/react-query";

const fetchTrades = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=40`
  );
  return res.json();
};

export default function MarketTrades({ symbol }) {
  const { data = [] } = useQuery({
    queryKey: ["trades", symbol],
    queryFn: () => fetchTrades(symbol),
    refetchInterval: 1000,
  });

  return (
    <div className="flex flex-col h-full p-4 border-t border-gray-800 bg-[#0f1116] text-white">
      <h3 className="text-sm font-semibold mb-2">Market Trades</h3>
      <div className="grid grid-cols-3 text-gray-400 text-xs mb-1">
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-[2px]">
        {data.map((trade, i) => {
          const time = new Date(trade.time).toLocaleTimeString();
          return (
            <div
              key={i}
              className="grid grid-cols-3 text-xs items-center py-[2px]" >
              <span
                className={trade.isBuyerMaker ? "text-[#ea3943]" : "text-[#16c784]"}>
                {Number(trade.price).toFixed(2)}
              </span>
              <span>{Number(trade.qty).toFixed(4)}</span>
              <span className="text-gray-400">{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
