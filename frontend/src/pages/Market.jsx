import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../ui/Sidebar";

function Market() {
  const captch = localStorage.getItem("_grecaptcha");

  const [market, setMarket] = useState("USDT");
  const [selectedCoin, setSelectedCoin] = useState("");

  const [interval, setInterval] = useState("1m");
  const [range, setRange] = useState("3h");
  const [chartType, setChartType] = useState("area");

  const rangeToMinutes = {
    "1h": 60,
    "3h": 180,
    "6h": 360,
    "12h": 720,
    "1d": 1440,
    "7d": 10080,
  };

  const intervalToMinutes = {
    "1m": 1,
    "5m": 5,
    "15m": 15,
    "1h": 60,
  };

  const limit = rangeToMinutes[range] / intervalToMinutes[interval];

  /* COINS */
  const { data: coins = [] } = useQuery({
    queryKey: ["coins", market],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.binance.com/api/v3/exchangeInfo",
      );

      const filtered = res.data.symbols
        .filter((s) => s.quoteAsset === market && s.status === "TRADING")
        .map((s) => s.symbol);

      if (!selectedCoin && filtered.length) {
        setSelectedCoin(filtered[0]);
      }

      return filtered;
    },
  });

  /* TICKER */
  const { data: ticker } = useQuery({
    queryKey: ["ticker", selectedCoin],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`,
      );
      return res.data;
    },
    enabled: !!selectedCoin,
    refetchInterval: 1000,
  });

  /* CANDLE DATA */
  const { data: candleData = [] } = useQuery({
    queryKey: ["chart", selectedCoin, interval, range],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=${interval}&limit=${limit}`,
      );

      return res.data.map((c) => ({
        time: c[0],
        open: parseFloat(c[1]),
        close: parseFloat(c[4]),
        volume: parseFloat(c[5]),
        color: parseFloat(c[4]) >= parseFloat(c[1]) ? "#22c55e" : "#ef4444",
      }));
    },
    enabled: !!selectedCoin,
  });

  /* PRICE CHART */
  const renderPriceChart = () => {
    if (chartType === "line") {
      return (
        <LineChart data={candleData}>
          <CartesianGrid stroke="#2a3a4d" />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            interval="preserveStartEnd"
            tickFormatter={(t) => {
              const date = new Date(t);

              if (range === "1h" || range === "3h" || range === "6h") {
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              if (range === "12h" || range === "1d") {
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line dataKey="close" stroke="#facc15" strokeWidth={2} dot={false} />
        </LineChart>
      );
    }

    if (chartType === "area") {
      return (
        <AreaChart data={candleData}>
          <CartesianGrid stroke="#2a3a4d" />
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            interval="preserveStartEnd"
            tickFormatter={(t) => {
              const date = new Date(t);

              if (range === "1h" || range === "3h" || range === "6h") {
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              if (range === "12h" || range === "1d") {
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }

              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Area
            dataKey="close"
            stroke="#facc15"
            fill="#facc15"
            fillOpacity={0.2}
          />
        </AreaChart>
      );
    }

    return (
      <BarChart data={candleData}>
        <CartesianGrid stroke="#2a3a4d" />
        <XAxis
          dataKey="time"
          stroke="#9ca3af"
          interval="preserveStartEnd"
          tickFormatter={(t) => {
            const date = new Date(t);

            if (range === "1h" || range === "3h" || range === "6h") {
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            }

            if (range === "12h" || range === "1d") {
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            }

            return date.toLocaleDateString([], {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis stroke="#9ca3af" />
        <Tooltip />
        <Bar dataKey="close" fill="#facc15" />
      </BarChart>
    );
  };

  /* VOLUME CHART */
  const renderVolumeChart = () => (
    <BarChart data={candleData}>
      <CartesianGrid stroke="#2a3a4d" />
      <XAxis
        dataKey="time"
        stroke="#9ca3af"
        interval="preserveStartEnd"
        tickFormatter={(t) => {
          const date = new Date(t);

          if (range === "1h" || range === "3h" || range === "6h") {
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          if (range === "12h" || range === "1d") {
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          return date.toLocaleDateString([], {
            month: "short",
            day: "numeric",
          });
        }}
      />
      <YAxis stroke="#9ca3af" />
      <Tooltip />
      <Bar dataKey="volume">
        {candleData.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  );

  return (
    <>
      <Navbar />

      <div
        className={`min-h-screen bg-[#151d27] text-white ${
          captch ? "grid grid-cols-[250px_1fr]" : "grid grid-cols-1"
        }`}
      >
        {/* Sidebar only when logged in */}
        {captch && <Sidebar />}

        {/* MAIN CONTENT */}
        <main className="px-8 py-10 w-full overflow-x-hidden">
          <h1 className="text-3xl font-bold mb-6">Crypto Market Dashboard</h1>

          {/* MARKET + COIN SELECT */}
          <div className="flex gap-4 mb-6">
            <div>
              <label className="mr-2">Market</label>
              <select
                value={market}
                onChange={(e) => {
                  setMarket(e.target.value);
                  setSelectedCoin("");
                }}
                className="bg-[#1e2a38] px-4 py-2 rounded"
              >
                <option>USDT</option>
                <option>BTC</option>
                <option>ETH</option>
              </select>
            </div>

            <div>
              <label className="mr-2">Coin</label>
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="bg-[#1e2a38] px-4 py-2 rounded"
              >
                {coins.map((coin) => (
                  <option key={coin}>{coin}</option>
                ))}
              </select>
            </div>
          </div>

          {/* MARKET STATS */}
          {ticker && (
            <div className="grid grid-cols-4 gap-6 mb-10">
              <Stat
                title="Price"
                value={`$${Number(ticker.lastPrice).toFixed(2)}`}
              />
              <Stat
                title="24h Change"
                value={`${Number(ticker.priceChangePercent).toFixed(2)}%`}
              />
              <Stat
                title="24h Volume"
                value={Number(ticker.volume).toFixed(2)}
              />
              <Stat
                title="Quote Volume"
                value={Number(ticker.quoteVolume).toFixed(2)}
              />
              <Stat title="High" value={Number(ticker.highPrice).toFixed(2)} />
              <Stat title="Low" value={Number(ticker.lowPrice).toFixed(2)} />
              <Stat
                title="Bid Price"
                value={Number(ticker.bidPrice).toFixed(2)}
              />
              <Stat
                title="Ask Price"
                value={Number(ticker.askPrice).toFixed(2)}
              />
              <Stat
                title="Weighted Avg"
                value={Number(ticker.weightedAvgPrice).toFixed(2)}
              />
              <Stat title="Trade Count" value={ticker.count} />
            </div>
          )}

          {/* SELECTORS ROW */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {/* Interval */}
            {["1m", "5m", "15m", "1h"].map((i) => (
              <button
                key={i}
                onClick={() => setInterval(i)}
                className={`px-3 py-1 rounded ${
                  interval === i ? "bg-yellow-500 text-black" : "bg-[#1e2a38]"
                }`}
              >
                {i}
              </button>
            ))}

            {/* Range */}
            {["1h", "3h", "6h", "12h", "1d", "7d"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded ${
                  range === r ? "bg-green-500 text-black" : "bg-[#1e2a38]"
                }`}
              >
                {r}
              </button>
            ))}

            {/* Chart Type */}
            {["line", "area", "bar"].map((c) => (
              <button
                key={c}
                onClick={() => setChartType(c)}
                className={`px-3 py-1 rounded capitalize ${
                  chartType === c ? "bg-blue-500 text-black" : "bg-[#1e2a38]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {/* PRICE CHART */}
          <div className="bg-[#1e2a38] rounded-xl p-6 mb-10">
            <h2 className="text-xl font-bold mb-6">Price Trend</h2>
            <ResponsiveContainer width="100%" height={350}>
              {renderPriceChart()}
            </ResponsiveContainer>
          </div>

          {/* VOLUME CHART */}
          <div className="bg-[#1e2a38] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Volume</h2>
            <ResponsiveContainer width="100%" height={250}>
              {renderVolumeChart()}
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="bg-[#1e2a38] p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <p className={`text-xl font-bold ${color || ""}`}>{value}</p>
    </div>
  );
}

export default Market;
