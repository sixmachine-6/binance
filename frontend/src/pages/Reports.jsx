import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMarketData } from "../hooks/useMarketData";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ---------------- Fetch Historical Data ---------------- */
async function fetchHistorical(symbol) {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=50`,
  );

  const raw = await res.json();

  return raw.map((c) => ({
    time: new Date(c[0]).toLocaleTimeString([], { hour: "2-digit" }),
    price: Number(c[4]),
    volume: Number(c[5]),
  }));
}

export default function Reports() {
  const [market, setMarket] = useState("CRYPTO");

  const { data: marketData = [] } = useMarketData(market);

  /* Default selected coin */
  const [symbol, setSymbol] = useState("");

  const selectedSymbol = symbol || marketData?.[0]?.symbol;

  const { data: history = [] } = useQuery({
    queryKey: ["history", selectedSymbol],
    queryFn: () => fetchHistorical(selectedSymbol),
    enabled: !!selectedSymbol,
    refetchInterval: 60000,
  });

  /* Top gainers/losers */
  const gainers = [...marketData]
    .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
    .slice(0, 10);

  const losers = [...marketData]
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 10);

  const gainersData = gainers.map((c) => ({
    symbol: c.symbol,
    change: Number(c.priceChangePercent),
  }));

  const losersData = losers.map((c) => ({
    symbol: c.symbol,
    change: Number(c.priceChangePercent),
  }));

  return (
    <div className="p-10 text-white space-y-10 bg-[#1d2631]">
      {/* -------- Market Selector -------- */}
      <div className="flex gap-4">
        <select
          value={market}
          onChange={(e) => {
            setMarket(e.target.value);
            setSymbol("");
          }}
          className="bg-[#0f1116] p-3 rounded-lg border border-gray-700"
        >
          <option value="CRYPTO">Crypto</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="BNB">BNB</option>
        </select>

        {/* Coin Selector */}
        <select
          value={selectedSymbol || ""}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-[#0f1116] p-3 rounded-lg border border-gray-700"
        >
          {marketData.slice(0, 50).map((coin) => (
            <option key={coin.symbol} value={coin.symbol}>
              {coin.symbol}
            </option>
          ))}
        </select>
      </div>

      {/* -------- Price Trend -------- */}
      <div className="bg-[#0f1116] p-6 rounded-xl">
        <h3 className="mb-4">{selectedSymbol} Price Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#16c784"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* -------- Volume Trend -------- */}
      <div className="bg-[#0f1116] p-6 rounded-xl">
        <h3 className="mb-4">{selectedSymbol} Volume Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={history}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#f7931a"
              fill="#f7931a"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* -------- Gainers / Losers -------- */}
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-[#0f1116] p-6 rounded-xl">
          <h3 className="mb-4">Top Gainers</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gainersData}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="symbol" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="change" fill="#16c784" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0f1116] p-6 rounded-xl">
          <h3 className="mb-4">Top Losers</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={losersData}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="symbol" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="change" fill="#ea3943" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
