import { useRef } from "react";
<<<<<<< HEAD
import { useTrade } from "../../context/TradeContext";

export default function TradePanel({ symbol, price }) {
  const { buy, sell, balance, positions } = useTrade();

  const amountRef = useRef();

=======
import { useExecuteTrade } from "../../hooks/useExecuteTrade";

export default function TradePanel({ symbol, price }) {
  const amountRef = useRef();

  const { mutate } = useExecuteTrade();

>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
  const handleBuy = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

<<<<<<< HEAD
    buy(symbol, price, amount);
=======
    mutate({
      symbol,
      price,
      quantity: amount,
      side: "BUY",
    });
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

    amountRef.current.value = "";
  };

  const handleSell = () => {
    const amount = Number(amountRef.current.value);

    if (!amount) return;

<<<<<<< HEAD
    sell(symbol, price, amount);
=======
    mutate({
      symbol,
      price,
      quantity: amount,
      side: "SELL",
    });
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

    amountRef.current.value = "";
  };

<<<<<<< HEAD
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
=======
  return (
    <div className="bg-gray-900 rounded-xl p-6 w-full space-y-6">
      <div className="text-lg font-semibold">Price: ${price}</div>

>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
      <input
        ref={amountRef}
        type="number"
        placeholder="Amount"
        className="w-full bg-gray-800 p-3 rounded-lg outline-none"
      />

<<<<<<< HEAD
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
=======
      <div className="flex gap-4">
        <button
          onClick={handleBuy}
          className="flex-1 bg-green-500 p-3 rounded-lg"
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        >
          Buy
        </button>

        <button
          onClick={handleSell}
<<<<<<< HEAD
          className="flex-1 bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold"
=======
          className="flex-1 bg-red-500 p-3 rounded-lg"
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        >
          Sell
        </button>
      </div>
    </div>
  );
}
