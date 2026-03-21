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
    <div className="bg-gray-900 rounded-xl p-6 w-80 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>Market</span>
        <span>{symbol}</span>
      </div>

      {/* PRICE */}
      <div className="text-lg font-semibold">Price: ${price}</div>

      {/* INPUT */}
      <input
        ref={amountRef}
        type="number"
        placeholder="Amount"
        className="w-full bg-gray-800 p-3 rounded-lg outline-none"
      />

      {/* BALANCE */}
      <div className="text-sm text-gray-400">
        Balance: ${balance.toFixed(2)}
      </div>

      {/* COIN HOLDINGS */}
      <div className="text-sm text-gray-400">
        {symbol} Holdings: {coinBalance}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleBuy}
          className="flex-1 bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold"
        >
          Buy
        </button>

        <button
          onClick={handleSell}
          className="flex-1 bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold"
        >
          Sell
        </button>
      </div>
    </div>
  );
}
