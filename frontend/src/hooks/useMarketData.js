import { useQuery } from "@tanstack/react-query";

const fetchMarketData = async (market) => {
  const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  const data = await res.json();

  let filtered = data;

  if (market === "CRYPTO") {
    filtered = data.filter((c) => c.symbol.endsWith("USDT"));
  }

  if (market === "BTC") {
    filtered = data.filter((c) => c.symbol.endsWith("BTC"));
  }

  if (market === "ETH") {
    filtered = data.filter((c) => c.symbol.endsWith("ETH"));
  }

  if (market === "BNB") {
    filtered = data.filter((c) => c.symbol.endsWith("BNB"));
  }

  return filtered;
};

export const useMarketData = (market) => {
  return useQuery({
    queryKey: ["marketData", market],
    queryFn: () => fetchMarketData(market),
    refetchInterval: 1000,
  });
};
