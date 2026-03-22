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
    <div style={container}>
      <h3 style={{ marginBottom: 10 }}>Order Book</h3>

      <div style={header}>
        <span>Price (USDT)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {data.asks.slice(0, 10).map((a, i) => {
        total += parseFloat(a[1]);

        return (
          <div key={i} style={row}>
            <span style={{ color: "#ea3943" }}>{a[0]}</span>
            <span>{a[1]}</span>
            <span>{total.toFixed(3)}</span>
          </div>
        );
      })}

      {data.bids.slice(0, 10).map((b, i) => {
        total += parseFloat(b[1]);

        return (
          <div key={i} style={row}>
            <span style={{ color: "#16c784" }}>{b[0]}</span>
            <span>{b[1]}</span>
            <span>{total.toFixed(3)}</span>
          </div>
        );
      })}
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
