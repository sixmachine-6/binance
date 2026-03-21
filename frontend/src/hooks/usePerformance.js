import { useQuery } from "@tanstack/react-query";

const fetchTrades = async () => {
  const res = await fetch("http://localhost:5000/api/v1/trades");
  return res.json();
};

export default function usePerformance() {
  const { data: trades = [] } = useQuery({
    queryKey: ["trades"],
    queryFn: fetchTrades,
  });

  const tradesWithProfit = trades.map((trade) => {
    const profit = (trade.exitPrice - trade.entryPrice) * trade.quantity;

    return { ...trade, profit };
  });

  const totalTrades = tradesWithProfit.length;

  const winningTrades = tradesWithProfit.filter((t) => t.profit > 0).length;

  const losingTrades = tradesWithProfit.filter((t) => t.profit < 0).length;

  const totalProfit = tradesWithProfit.reduce((acc, t) => acc + t.profit, 0);

  const winRate =
    totalTrades === 0 ? 0 : ((winningTrades / totalTrades) * 100).toFixed(2);

  return {
    trades: tradesWithProfit,
    totalTrades,
    winningTrades,
    losingTrades,
    totalProfit,
    winRate,
  };
}
