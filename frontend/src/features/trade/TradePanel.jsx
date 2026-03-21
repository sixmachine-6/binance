import { useRef } from "react";
import { useTrade } from "../../context/TradeContext";

export default function TradePanel({ symbol, price }) {
  const { buy, sell, balance, positions } = useTrade();
  const amountRef = useRef();
  const handleBuy = () => {
    const amount = Number(amountRef.current.value);
    if (!amount) return;
    buy(symbol, price, amount);
    amountRef.current.value = "";
  };
  const handleSell = () => {
    const amount = Number(amountRef.current.value);
    if (!amount) return;
    sell(symbol, price, amount);
    amountRef.current.value = "";
  };
  const coinBalance = positions[symbol] || 0;
  return (
    <div className="bg-[#0b0e11] border border-gray-800 rounded-2xl p-5 w-full space-y-5 shadow-lg">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Market</span>
        <span className="text-gray-200">{symbol}</span>
      </div>
      <div className="text-lg font-semibold text-white">
        Price: ${price || "--"}
      </div>
      <input
        ref={amountRef}
        type="number"
        placeholder="Enter amount"
        className="w-full bg-[#1e2329] text-white p-3 rounded-lg border border-gray-700 
      outline-none focus:ring-1 focus:ring-yellow-400"  />
      <div className="text-sm text-gray-400">
        Balance: ${balance.toFixed(2)}
      </div>
      <div className="text-sm text-gray-400">
        {symbol} Holdings: {coinBalance}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleBuy}
          className="flex-1 bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold transition">
          Buy
        </button>
        <button
          onClick={handleSell}
          className="flex-1 bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold transition"
        >
          Sell
        </button>
      </div>
    </div>
  );
}
