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
