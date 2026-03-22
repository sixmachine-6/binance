import { useQuery } from "@tanstack/react-query";

async function fetchHistorical(symbol) {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=50`,
  );

  const data = await res.json();

  return data.map((c) => ({
    time: new Date(c[0]).toLocaleTimeString(),
    price: Number(c[4]),
    volume: Number(c[5]),
  }));
}

export function useHistoricalData(symbol) {
  return useQuery({
    queryKey: ["history", symbol],
    queryFn: () => fetchHistorical(symbol),
    refetchInterval: 60000,
  });
}
