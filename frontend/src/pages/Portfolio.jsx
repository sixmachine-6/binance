<<<<<<< HEAD
import { useTrade } from "../context/TradeContext";

export default function Portfolio() {
  const { balance, positions } = useTrade();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>

      <div className="bg-gray-900 p-6 rounded-lg mb-6">
=======
import { usePortfolio } from "../hooks/usePortfolio";
import StatsCards from "../features/performance/StatsCard";
import ProfitChart from "../features/performance/ProfitChart";
import WinRateChart from "../features/performance/WinRateChart";

export default function Portfolio() {
  const { data, isLoading } = usePortfolio();

  if (isLoading) {
    return (
      <div className="p-6 text-white">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  const balance = data?.balance ?? 0;
  const positions = data?.positions ?? {};
  const trades = data?.trades ?? [];

  // If no trades
  if (trades.length === 0) {
    return (
      <div className="p-6 text-white space-y-8 bg-[#1d2631]">
        <h1 className="text-2xl font-bold">Portfolio</h1>

        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400">Balance</p>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>

        <div>
          <h2 className="text-xl mb-4">Positions</h2>

          {Object.keys(positions).length === 0 ? (
            <p className="text-gray-400">No positions yet</p>
          ) : (
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
          )}
        </div>

        <p className="text-gray-400">
          No trades yet. Start trading to see analytics.
        </p>
      </div>
    );
  }

  // analytics calculations
  const tradesWithProfit = trades.map((trade) => ({
    ...trade,
    profit: trade.profit ?? 0,
  }));

  const totalTrades = tradesWithProfit.length;

  const winningTrades = tradesWithProfit.filter((t) => t.profit > 0).length;

  const losingTrades = tradesWithProfit.filter((t) => t.profit < 0).length;

  const totalProfit = tradesWithProfit.reduce((acc, t) => acc + t.profit, 0);

  const winRate =
    totalTrades === 0 ? 0 : ((winningTrades / totalTrades) * 100).toFixed(2);

  return (
    <div className="p-6 text-white space-y-8 bg-[#1d2631]">
      <h1 className="text-2xl font-bold">Portfolio</h1>

      {/* Balance */}
      <div className="bg-gray-900 p-6 rounded-lg">
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        <p className="text-gray-400">Balance</p>
        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
      </div>

<<<<<<< HEAD
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
=======
      {/* Positions */}
      <div>
        <h2 className="text-xl mb-4">Positions</h2>

        {Object.keys(positions).length === 0 ? (
          <p className="text-gray-400">No positions yet</p>
        ) : (
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
        )}
      </div>

      {/* Performance */}
      <div>
        <h2 className="text-xl mb-4">Performance Analytics</h2>

        <StatsCards
          totalTrades={totalTrades}
          winningTrades={winningTrades}
          losingTrades={losingTrades}
          totalProfit={totalProfit}
          winRate={winRate}
        />

        <div className="grid grid-cols-2 gap-6 mt-8">
          <ProfitChart trades={tradesWithProfit} />

          <WinRateChart
            winningTrades={winningTrades}
            losingTrades={losingTrades}
          />
        </div>
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
      </div>
    </div>
  );
}
