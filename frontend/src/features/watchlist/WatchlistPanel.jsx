<<<<<<< HEAD
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
=======
import { useWatchlist } from "../../hooks/useWatchlist";

export default function Watchlist() {
  const { data } = useWatchlist();

  const watchlist = data?.watchlist ?? [];

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-lg mb-4">Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">No coins added</p>
      ) : (
        <div className="space-y-2">
          {watchlist.map((symbol) => (
            <div
              key={symbol}
              className="flex justify-between p-2 bg-gray-800 rounded"
            >
              {symbol}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
