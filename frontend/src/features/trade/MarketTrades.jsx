import { useQuery } from "@tanstack/react-query";

const fetchTrades = async (symbol) => {
  const res = await fetch(
<<<<<<< HEAD
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=40`,
=======
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=40`
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
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
<<<<<<< HEAD
    <div style={container}>
      <h4 style={{ marginBottom: 6 }}>Market Trades</h4>

      <div style={header}>
=======
    <div className="flex flex-col h-full p-4 border-t border-gray-800 bg-[#0f1116] text-white">
      <h3 className="text-sm font-semibold mb-2">Market Trades</h3>
      <div className="grid grid-cols-3 text-gray-400 text-xs mb-1">
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
<<<<<<< HEAD

      <div style={list}>
        {data.map((t, i) => {
          const time = new Date(t.time).toLocaleTimeString();

          return (
            <div key={i} style={row}>
              <span
                style={{
                  color: t.isBuyerMaker ? "#ea3943" : "#16c784",
                }}
              >
                {Number(t.price).toFixed(2)}
              </span>

              <span>{Number(t.qty).toFixed(4)}</span>

              <span>{time}</span>
=======
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
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
            </div>
          );
        })}
      </div>
    </div>
  );
}
<<<<<<< HEAD

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

=======
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
