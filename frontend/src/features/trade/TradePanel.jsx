import { useRef } from "react";
import { useExecuteTrade } from "../../hooks/useExecuteTrade";
import { sendTradeEmail } from "../../utils/sendTradeEmail";

export default function TradePanel({ symbol, price }) {
  const amountRef = useRef();
  const { mutate } = useExecuteTrade();

  // get email saved during signup
  const email = localStorage.getItem("email");

  const handleBuy = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

    const tradeData = {
      crypto_symbol: symbol,
      price: price,
      quantity: amount,
      type_currency: "buy",
      email: email,
    };

    // execute trade
    mutate({
      symbol,
      price,
      quantity: amount,
      side: "BUY",
    });

    // send email

    amountRef.current.value = "";
  };

  const handleSell = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

    const tradeData = {
      crypto_symbol: symbol,
      price: price,
      quantity: amount,
      type_currency: "sell",
      email: email,
    };

    // execute trade
    mutate({
      symbol,
      price,
      quantity: amount,
      side: "SELL",
    });

    // send email

    amountRef.current.value = "";
  };

  return (
    <div className="bg-[#0b0e11] border border-gray-800 rounded-2xl p-5 w-full space-y-5 shadow-lg">
      {/* Market Header */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>Market</span>
        <span className="text-gray-200">{symbol}</span>
      </div>

      {/* Price */}
      <div className="text-lg font-semibold text-white">
        Price: ${price || "--"}
      </div>

      {/* Amount Input */}
      <input
        ref={amountRef}
        type="number"
        placeholder="Enter amount"
        className="w-full bg-[#1e2329] text-white p-3 rounded-lg border border-gray-700 
        outline-none focus:ring-1 focus:ring-yellow-400"
      />

      {/* Buy / Sell Buttons */}
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
