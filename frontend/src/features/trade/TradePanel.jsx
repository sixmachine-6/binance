
import { useRef, useState } from "react";
import { useExecuteTrade } from "../../hooks/useExecuteTrade";

export default function TradePanel({ symbol, price }) {
  const amountRef = useRef();
  const { mutate, isLoading } = useExecuteTrade();

  const [error, setError] = useState("");

  const handleTrade = (side) => {
    const amount = Number(amountRef.current.value);

    if (!amount || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    setError("");

    mutate({
      symbol,
      price,
      quantity: amount,
      side,
    });

    amountRef.current.value = "";
  };

  return (
    <div className="bg-[#0b0e11] border border-gray-800 rounded-2xl p-5 w-full max-w-sm space-y-5 shadow-lg">

      {/* Price */}
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">Current Price</span>
        <span className="text-lg font-semibold text-white">
          ${price?.toFixed(2)}
        </span>
      </div>

      {/* Input */}
      <div>
        <input
          ref={amountRef}
          type="number"
          placeholder="Enter amount"
          className="w-full bg-[#1e2329] text-white p-3 rounded-lg outline-none border border-gray-700 focus:border-yellow-400"
        />

        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}
      </div>

      {/* Quick buttons */}
      <div className="flex gap-2">
        {[25, 50, 75, 100].map((p) => (
          <button
            key={p}
            onClick={() => {
              amountRef.current.value = p;
            }}
            className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 py-1 rounded"
          >
            {p}%
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleTrade("BUY")}
          disabled={isLoading}
          className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Buy"}
        </button>

        <button
          onClick={() => handleTrade("SELL")}
          disabled={isLoading}
          className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Sell"}
        </button>
      </div>
    </div>
  );
}