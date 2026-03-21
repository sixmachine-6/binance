import { useTrade } from "../context/TradeContext";

export default function Portfolio() {
  const { balance, positions } = useTrade();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>

      <div className="bg-gray-900 p-6 rounded-lg mb-6">
        <p className="text-gray-400">Balance</p>
        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
      </div>

      <h2 className="text-xl mb-4">Positions</h2>

      {Object.keys(positions).length === 0 && (
        <p className="text-gray-400">No positions yet</p>
      )}

      <div className="space-y-3">
        {Object.entries(positions).map(([coin, qty]) => (
          <div
            key={coin}
            className="flex justify-between bg-gray-900 p-4 rounded-lg"
          >
            <span>{coin}</span>
            <span>{qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
