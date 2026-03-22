import { useRef } from "react";
import { useExecuteTrade } from "../../hooks/useExecuteTrade";

export default function TradePanel({ symbol, price }) {
  const amountRef = useRef();

  const { mutate } = useExecuteTrade();

  const handleBuy = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

    mutate({
      symbol,
      price,
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
      price,
      quantity: amount,
      side: "SELL",
    });

    amountRef.current.value = "";
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 w-80 space-y-6">
      <div className="text-lg font-semibold">Price: ${price}</div>

      <input
        ref={amountRef}
        type="number"
        placeholder="Amount"
        className="w-full bg-gray-800 p-3 rounded-lg outline-none"
      />

      <div className="flex gap-4">
        <button
          onClick={handleBuy}
          className="flex-1 bg-green-500 p-3 rounded-lg"
        >
          Buy
        </button>

        <button
          onClick={handleSell}
          className="flex-1 bg-red-500 p-3 rounded-lg"
        >
          Sell
        </button>
      </div>
    </div>
  );
}
