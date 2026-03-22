import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const marketData = {
  BTC: [
    { time: "Jan", price: 42000 }, { time: "Feb", price: 44500 }, { time: "Mar", price: 47000 },
    { time: "Apr", price: 43000 }, { time: "May", price: 50000 }, { time: "Jun", price: 48000 },
    { time: "Jul", price: 52000 }, { time: "Aug", price: 55000 },
  ],
  ETH: [
    { time: "Jan", price: 2200 }, { time: "Feb", price: 2500 }, { time: "Mar", price: 2800 },
    { time: "Apr", price: 2600 }, { time: "May", price: 3000 }, { time: "Jun", price: 2900 },
    { time: "Jul", price: 3200 }, { time: "Aug", price: 3400 },
  ],
  BNB: [
    { time: "Jan", price: 280 }, { time: "Feb", price: 310 }, { time: "Mar", price: 340 },
    { time: "Apr", price: 300 }, { time: "May", price: 370 }, { time: "Jun", price: 360 },
    { time: "Jul", price: 390 }, { time: "Aug", price: 410 },
  ],
};

const coins = [
  { symbol: "BTC", name: "Bitcoin", change: "+4.2%", color: "text-green-400" },
  { symbol: "ETH", name: "Ethereum", change: "+2.8%", color: "text-green-400" },
  { symbol: "BNB", name: "BNB", change: "-1.1%", color: "text-red-400" },
];

const MarketOverview = () => {
  const [selected, setSelected] = useState("BTC");

  return (
    <div className="min-h-screen bg-[#151d27] text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Market Overview</h1>
      <p className="text-gray-400 mb-8">Live price charts and trends</p>

      {/* Coin Selector */}
      <div className="flex gap-4 mb-8">
        {coins.map((coin) => (
          <button
            key={coin.symbol}
            onClick={() => setSelected(coin.symbol)}
            className={`px-6 py-3 rounded-xl font-semibold transition border ${
              selected === coin.symbol
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-[#1e2a38] text-white border-gray-700 hover:border-yellow-400"
            }`}
          >
            <span className="text-lg">{coin.symbol}</span>
            <span className={`ml-2 text-sm ${selected === coin.symbol ? "text-black" : coin.color}`}>
              {coin.change}
            </span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#1e2a38] rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-6">{selected} / USDT Price Chart</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={marketData[selected]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4d" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1c242f", border: "1px solid #374151", borderRadius: "8px" }}
              labelStyle={{ color: "#f9fafb" }}
              itemStyle={{ color: "#facc15" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#facc15"
              strokeWidth={2.5}
              dot={{ fill: "#facc15", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketOverview;
