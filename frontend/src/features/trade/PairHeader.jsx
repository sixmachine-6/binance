import { useMarketTicker } from "../../hooks/useMarketTicker";

export default function PairHeader({ symbol }) {
  const { data } = useMarketTicker(symbol);

  if (!data) return null;

  const coin = symbol.replace("USDT", "").toLowerCase();

  return (
    <div style={container}>
      <div style={pairSection}>
        <img
          src={`https://cryptoicons.org/api/icon/${coin}/32`}
          alt={coin}
          style={{ width: 30 }}
        />

        <h2>{symbol}</h2>

        <span>${Number(data.lastPrice).toFixed(2)}</span>

        <span
          style={{
            color: data.priceChangePercent > 0 ? "#16c784" : "#ea3943",
          }}
        >
          {Number(data.priceChangePercent).toFixed(2)}%
        </span>
      </div>

      <div style={stats}>
        <Stat label="24h High" value={Number(data.highPrice).toFixed(2)} />
        <Stat label="24h Low" value={Number(data.lowPrice).toFixed(2)} />
        <Stat label="Volume" value={Number(data.volume).toFixed(0)} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ opacity: 0.6 }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 20px",
  borderBottom: "1px solid #1e1e1e",
};

const pairSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const stats = {
  display: "flex",
  gap: "30px",
};
