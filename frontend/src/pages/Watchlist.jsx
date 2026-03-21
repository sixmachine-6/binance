import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useMarketData } from "../hooks/useMarketData";

export default function Watchlist() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const { data = [] } = useMarketData("CRYPTO");

  const watchlistCoins = data.filter((coin) => watchlist.includes(coin.symbol));

  return (
    <div style={container}>
      <h2>⭐ My Watchlist</h2>

      {watchlistCoins.length === 0 && (
        <p style={{ opacity: 0.6 }}>No coins added to watchlist</p>
      )}

      <div style={tableHeader}>
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
        <span></span>
      </div>

      {watchlistCoins.map((coin) => {
        const change = Number(coin.priceChangePercent).toFixed(2);

        return (
          <div key={coin.symbol} style={row}>
            <Link to={`/trade/${coin.symbol}`} style={name}>
              {coin.symbol}
            </Link>

            <span>${Number(coin.lastPrice).toFixed(4)}</span>

            <span
              style={{
                color: change > 0 ? "#16c784" : "#ea3943",
              }}
            >
              {change}%
            </span>

            <button
              onClick={() => toggleWatchlist(coin.symbol)}
              style={removeBtn}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}

const container = {
  padding: "40px",
  color: "white",
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 120px",
  opacity: 0.6,
  marginTop: "20px",
  marginBottom: "10px",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 120px",
  padding: "12px",
  borderBottom: "1px solid #1e1e1e",
};

const name = {
  textDecoration: "none",
  color: "white",
};

const removeBtn = {
  background: "#ea3943",
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};
