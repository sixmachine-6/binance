import { useRef } from "react";
import { useExecuteTrade } from "../../hooks/useExecuteTrade";

import { useQuery } from "@tanstack/react-query";

export default function TradePanel({ symbol, priceRef }) {
  const { data } = useQuery({ queryKey: ["candles", symbol] }); // reuses cached data, no new fetch
  const livePrice = data ? parseFloat(data[data.length - 1][4]) : "--";
  const amountRef = useRef();

  const { mutate } = useExecuteTrade();

  const handleBuy = () => {
    const amount = Number(amountRef.current.value);
    if (!amount) return;

    mutate({
      symbol,
      price: priceRef.current,
      quantity: amount,
      side: "BUY",
    });

    amountRef.current.value = "";
  };

  const handleSell = () => {
    const amount = Number(amountRef.current.value);
    if (!amount) return;

    mutate({
      symbol,
      price: priceRef.current,
      quantity: amount,
      side: "SELL",
    });

    amountRef.current.value = "";
  };

  return (
    <div className="bg-[#0b0e11] border border-gray-800 rounded-2xl p-5 w-full space-y-5 shadow-lg">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Market</span>
        <span className="text-gray-200">{symbol}</span>
      </div>

      <div className="text-lg font-semibold text-white">
        Price: ${livePrice}
      </div>

      <input
        ref={amountRef}
        type="number"
        placeholder="Enter amount"
        className="w-full bg-[#1e2329] text-white p-3 rounded-lg border border-gray-700 
        outline-none focus:ring-1 focus:ring-yellow-400"
      />

      <div className="flex gap-3">
        <button
          onClick={handleBuy}
          className="flex-1 bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold transition"
        >
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
