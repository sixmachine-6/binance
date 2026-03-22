import { useQuery } from "@tanstack/react-query";

const fetchTicker = async (symbol) => {
  const res = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
  );
  return res.json();
};

export const useMarketTicker = (symbol) => {
  return useQuery({
    queryKey: ["ticker", symbol],
    queryFn: () => fetchTicker(symbol),
    refetchInterval: 1000,
  });
};
