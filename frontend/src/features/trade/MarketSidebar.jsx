import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchMarkets = async () => {
  const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  const data = await res.json();

  return data.filter((c) => c.symbol.endsWith("USDT")).slice(0, 10);
};

export default function MarketSidebar() {
  const { data = [] } = useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    refetchInterval: 1000,
  });

  return (
    <div style={container}>
      <div style={header}>
        <span>Pair</span>
        <span>Last Price</span>
        <span>24h Chg</span>
      </div>

      <div style={list}>
        {data.map((c) => {
          const coin = c.symbol.replace("USDT", "").toLowerCase();

          const change = Number(c.priceChangePercent).toFixed(2);

          return (
            <Link key={c.symbol} to={`/trade/${c.symbol}`} style={link}>
              <div style={row}>
                <div style={pair}>
                  {/* <img
                    src={`https://cryptoicons.org/api/icon/${coin}/20`}
                    alt={coin}
                    style={{ marginRight: 6 }}
                  /> */}

                  {c.symbol}
                </div>

                <span>{Number(c.lastPrice).toFixed(3)}</span>

                <span
                  style={{
                    color: change > 0 ? "#16c784" : "#ea3943",
                  }}
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

const container = {
  padding: "10px",
  borderLeft: "1px solid #1e1e1e",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  opacity: 0.6,
  marginBottom: 6,
};

const list = {
  overflowY: "auto",
  flex: 1,
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "6px 0",
  fontSize: "13px",
};

const pair = {
  display: "flex",
  alignItems: "center",
};

const link = {
  textDecoration: "none",
  color: "white",
};
