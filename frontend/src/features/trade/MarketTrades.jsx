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
    <div style={container}>
      <h4 style={{ marginBottom: 6 }}>Market Trades</h4>

      <div style={header}>
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>

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

