import { useMemo } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import StatsCards from "../features/performance/StatsCard";
import ProfitChart from "../features/performance/ProfitChart";
import WinRateChart from "../features/performance/WinRateChart";

export default function Portfolio() {
  const { data, isLoading } = usePortfolio();

  const balance = data?.balance ?? 0;
  const positions = data?.positions ?? {};
  const trades = data?.trades ?? [];
  const prices = data?.prices ?? {};

  // -------- Portfolio Calculations --------

  const investedValue = useMemo(() => {
    return trades.reduce(
      (acc, t) => acc + (t.price ?? 0) * (t.quantity ?? 0),
      0,
    );
  }, [trades]);

  const currentValue = useMemo(() => {
    return Object.entries(positions).reduce(
      (acc, [coin, qty]) => acc + qty * (prices[coin] ?? 0),
      0,
    );
  }, [positions, prices]);

  const totalPnL = currentValue - investedValue;

  const pnlPercent = investedValue === 0 ? 0 : (totalPnL / investedValue) * 100;

  // -------- Calculate trade profit dynamically --------

  const tradesWithProfit = useMemo(() => {
    return trades.map((trade) => {
      const currentPrice = prices[trade.symbol] ?? trade.price;

      let profit = 0;

      if (trade.side === "BUY") {
        profit = (currentPrice - trade.price) * trade.quantity;
      } else {
        profit = (trade.price - currentPrice) * trade.quantity;
      }

      return {
        ...trade,
        profit,
      };
    });
  }, [trades, prices]);

  // -------- analytics calculations --------

  const totalTrades = tradesWithProfit.length;

  const winningTrades = tradesWithProfit.filter((t) => t.profit > 0).length;

  const losingTrades = tradesWithProfit.filter((t) => t.profit < 0).length;

  const totalProfit = tradesWithProfit.reduce((acc, t) => acc + t.profit, 0);

  const winRate =
    totalTrades === 0 ? 0 : ((winningTrades / totalTrades) * 100).toFixed(2);

  // -------- Loading state --------

  if (isLoading) {
    return (
      <div className="p-6 text-white">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  // -------- No trades state --------

  if (trades.length === 0) {
    return (
      <div className="p-6 text-white space-y-8 bg-[#1d2631]">
        <h1 className="text-2xl font-bold">Portfolio</h1>

        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-400">Balance</p>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>

        <p className="text-gray-400">
          No trades yet. Start trading to see analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-8 bg-[#1d2631]">
      <h1 className="text-2xl font-bold">Portfolio</h1>

      {/* Portfolio Value */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <p className="text-gray-400">Portfolio Value</p>

        <p className="text-3xl font-bold">
          ${(balance + currentValue).toFixed(2)}
        </p>

        <p
          className={`mt-2 font-semibold ${
            totalPnL >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)} (
          {pnlPercent.toFixed(2)}%)
        </p>
      </div>

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

                <div className="flex gap-6">
                  <span>{qty}</span>

                  <span className="text-gray-400">
                    ${prices[coin]?.toFixed(2) ?? "0.00"}
                  </span>
                </div>
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
      </div>
    </div>
  );
}
