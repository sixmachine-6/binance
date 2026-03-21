import { useQuery } from "@tanstack/react-query";

const fetchDepth = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`,
  );
  return res.json();
};

export default function OrderBook({ symbol }) {
  const { data } = useQuery({
    queryKey: ["depth", symbol],
    queryFn: () => fetchDepth(symbol),
    refetchInterval: 1000,
  });
  if (!data) return null;
  let total = 0;
  return (
    <div className="h-full flex flex-col text-xs">
      <h3 className="text-sm font-semibold mb-3 text-gray-300">
        Order Book
      </h3>
      <div className="grid grid-cols-3 text-gray-500 mb-2">
        <span>Price</span>
        <span>Amount</span>
        <span>Total</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-[2px]">
        {data.asks.slice(0, 10).map((a, i) => {
          total += parseFloat(a[1]);
          return (
            <div key={i} className="grid grid-cols-3 text-red-400">
              <span>{a[0]}</span>
              <span className="text-gray-300">{a[1]}</span>
              <span className="text-gray-400">{total.toFixed(3)}</span>
            </div>
          );
        })}
        {data.bids.slice(0, 10).map((b, i) => {
          total += parseFloat(b[1]);
          return (
            <div key={i} className="grid grid-cols-3 text-green-400">
              <span>{b[0]}</span>
              <span className="text-gray-300">{b[1]}</span>
              <span className="text-gray-400">{total.toFixed(3)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const container = {
  padding: "15px",
  borderRight: "1px solid #1e1e1e",
  fontSize: "13px",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
  marginBottom: "8px",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "3px 0",
};
