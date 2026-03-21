import { useQuery } from "@tanstack/react-query";

const fetchTrades = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=40`,
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
    <div className="h-full flex flex-col text-xs">
      <h4 className="text-sm text-gray-300 mb-2">Market Trades</h4>
      <div className="grid grid-cols-3 text-gray-500 mb-1">
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-[2px]">
        {data.map((t, i) => {
          const time = new Date(t.time).toLocaleTimeString();
          return (
            <div key={i} className="grid grid-cols-3">
              <span
                className={
                  t.isBuyerMaker ? "text-red-400" : "text-green-400" } >
                {Number(t.price).toFixed(2)}
              </span>
              <span className="text-gray-300">
                {Number(t.qty).toFixed(4)}
              </span>
              <span className="text-gray-500">{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const container = {
  borderTop: "1px solid #1e1e1e",
  padding: "10px",
  height: "250px",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
};

const list = {
  overflowY: "auto",
  maxHeight: "200px",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  fontSize: "12px",
  padding: "3px 0",
};

