export default function StatsCards({
  totalTrades,
  winningTrades,
  losingTrades,
  totalProfit,
  winRate,
}) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">Total Trades</p>
        <p className="text-xl font-bold">{totalTrades}</p>
      </div>

      <div className="bg-green-900 p-4 rounded-lg">
        <p className="text-sm">Winning Trades</p>
        <p className="text-xl font-bold">{winningTrades}</p>
      </div>

      <div className="bg-red-900 p-4 rounded-lg">
        <p className="text-sm">Losing Trades</p>
        <p className="text-xl font-bold">{losingTrades}</p>
      </div>

      <div className="bg-blue-900 p-4 rounded-lg">
        <p className="text-sm">Total PnL</p>
        <p className="text-xl font-bold">${totalProfit.toFixed(2)}</p>
      </div>

      <div className="bg-purple-900 p-4 rounded-lg">
        <p className="text-sm">Win Rate</p>
        <p className="text-xl font-bold">{winRate}%</p>
      </div>
    </div>
  );
}
