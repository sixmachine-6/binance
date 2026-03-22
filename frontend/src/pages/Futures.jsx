import React, { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const pairs = [
  { pair: "BTCUSDT", price: "55,230.40", change: "+3.2%", up: true },
  { pair: "ETHUSDT", price: "3,412.80", change: "+1.8%", up: true },
  { pair: "BNBUSDT", price: "412.50", change: "-0.9%", up: false },
  { pair: "SOLUSDT", price: "142.30", change: "+5.1%", up: true },
  { pair: "XRPUSDT", price: "0.6120", change: "-2.3%", up: false },
];

const Futures = () => {
  const [selectedPair, setSelectedPair] = useState(pairs[0]);
  const [orderType, setOrderType] = useState("Limit");
  const [side, setSide] = useState("Buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(10);

  const handleSubmit = () => {
    alert(`${side} order placed!\nPair: ${selectedPair.pair}\nPrice: ${price}\nAmount: ${amount}\nLeverage: ${leverage}x`);
  };

  // Most reliable TradingView URL format
  const chartUrl = `https://www.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22BINANCE%3A${selectedPair.pair}%22%2C%22frameElementId%22%3A%22tradingview%22%2C%22interval%22%3A%2215%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%220%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22withdateranges%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BINANCE%3A${selectedPair.pair}%22%2C%22page-uri%22%3A%22localhost%22%7D`;

  return (
    <div className="min-h-screen bg-[#151d27] text-white flex">

      {/* Left: Pairs List */}
      <div className="w-56 bg-[#1c242f] border-r border-gray-800 py-6 px-3 flex-shrink-0">
        <h2 className="text-sm font-bold text-gray-400 mb-4 px-2">FUTURES PAIRS</h2>
        {pairs.map((p) => (
          <div
            key={p.pair}
            onClick={() => setSelectedPair(p)}
            className={`flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer mb-1 transition ${
              selectedPair.pair === p.pair ? "bg-[#2a3a4d]" : "hover:bg-[#222d3a]"
            }`}
          >
            <span className="text-sm font-semibold">{p.pair}</span>
            <span className={`text-xs font-bold ${p.up ? "text-green-400" : "text-red-400"}`}>
              {p.change}
            </span>
          </div>
        ))}
      </div>

      {/* Center: Chart */}
      <div className="flex-1 flex flex-col p-4 min-w-0">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold">{selectedPair.pair}</h1>
          <span className="text-3xl font-bold text-yellow-400">${selectedPair.price}</span>
          <span className={`text-lg font-semibold flex items-center gap-1 ${selectedPair.up ? "text-green-400" : "text-red-400"}`}>
            {selectedPair.up ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            {selectedPair.change}
          </span>
        </div>

        {/* Chart iframe */}
        <div className="rounded-2xl border border-gray-700 overflow-hidden" style={{ height: "480px" }}>
          <iframe
            key={selectedPair.pair}
            src={chartUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowTransparency={true}
            scrolling="no"
            allowFullScreen={true}
            style={{ border: "none" }}
          />
        </div>

        {/* Open Positions */}
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-3">Open Positions</h2>
          <div className="bg-[#1e2a38] rounded-xl border border-gray-700 p-4 text-gray-400 text-sm text-center">
            No open positions
          </div>
        </div>
      </div>

      {/* Right: Order Form */}
      <div className="w-72 bg-[#1c242f] border-l border-gray-800 p-6 flex-shrink-0">
        <h2 className="text-lg font-bold mb-4">Place Order</h2>

        {/* Leverage */}
        <div className="mb-4">
          <label className="text-gray-400 text-xs mb-1 block">Leverage: {leverage}x</label>
          <input
            type="range" min={1} max={125} value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full accent-yellow-400"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1x</span><span>125x</span>
          </div>
        </div>

        {/* Order Type */}
        <div className="flex gap-2 mb-4">
          {["Limit", "Market"].map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                orderType === t ? "bg-yellow-400 text-black" : "bg-[#2a3a4d] text-white hover:bg-[#334155]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Buy / Sell */}
        <div className="flex gap-2 mb-4">
          {["Buy", "Sell"].map((s) => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                side === s
                  ? s === "Buy" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  : "bg-[#2a3a4d] text-white hover:bg-[#334155]"
              }`}
            >
              {s} / {s === "Buy" ? "Long" : "Short"}
            </button>
          ))}
        </div>

        {/* Price */}
        {orderType === "Limit" && (
          <div className="mb-3">
            <label className="text-gray-400 text-xs mb-1 block">Price (USDT)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#151d27] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-yellow-400"
            />
          </div>
        )}

        {/* Amount */}
        <div className="mb-5">
          <label className="text-gray-400 text-xs mb-1 block">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#151d27] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-yellow-400"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-bold text-sm transition ${
            side === "Buy"
              ? "bg-green-500 hover:bg-green-400 text-white"
              : "bg-red-500 hover:bg-red-400 text-white"
          }`}
        >
          {side === "Buy" ? "Buy / Long" : "Sell / Short"}
        </button>
      </div>
    </div>
  );
};

export default Futures;
