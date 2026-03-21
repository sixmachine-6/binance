import { useWatchlist } from "../../context/WatchlistContext";

export default function WatchlistPanel() {
  const { watchlist } = useWatchlist();
  console.log(watchlist);
  return (
    <div style={panel}>
      <h3>Watchlist</h3>

      {watchlist.length === 0 && <p>No coins added</p>}

      {watchlist.map((coin) => (
        <div key={coin}>{coin}</div>
      ))}
    </div>
  );
}

const panel = {
  position: "fixed",
  right: "20px",
  top: "100px",
  background: "#0f1116",
  padding: "20px",
  borderRadius: "10px",
  color: "black",
};
