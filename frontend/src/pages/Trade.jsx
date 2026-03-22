import { useParams } from "react-router-dom";
import OrderBook from "../features/trade/OrderBook";
import Chart from "../features/trade/Chart";
import MarketSidebar from "../features/trade/MarketSidebar";
import PairHeader from "../features/trade/PairHeader";
import MarketTrades from "../features/trade/MarketTrades";
<<<<<<< HEAD
import TradePanel from "../features/trade/TradePanel";
=======
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8

export default function Trade() {
  const { symbol } = useParams();

  return (
<<<<<<< HEAD
    <div className="h-screen flex flex-col bg-[#0f1116] text-white">
      <PairHeader symbol={symbol} />

      <div className="grid grid-cols-[300px_1fr_320px] flex-1">
        {/* ORDER BOOK */}
        <OrderBook symbol={symbol} />

        {/* CENTER AREA */}
        <div className="flex flex-col">
          <Chart symbol={symbol} />

          {/* BUY / SELL PANEL */}
          <TradePanel symbol={symbol} />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col border-l border-gray-800">
          <MarketSidebar />

          <MarketTrades symbol={symbol} />
=======
    <div className="h-screen flex flex-col bg-[#0b0e11] text-gray-200">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#0b0e11]">
        <PairHeader symbol={symbol} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-[280px_1fr_320px] flex-1 gap-[1px] bg-gray-900">

        {/* Left - Order Book */}
        <div className="bg-[#0f1116] border-r border-gray-800 overflow-hidden">
          <OrderBook symbol={symbol} />
        </div>

        {/* Center - Chart (with TradePanel inside) */}
        <div className="flex flex-col bg-[#0f1116]">
          <div className="border-b border-gray-800 p-3">
            <Chart symbol={symbol} /> {/* TradePanel is inside Chart now */}
          </div>
        </div>

        {/* Right - Market Sidebar + Trades */}
        <div className="flex flex-col bg-[#0f1116] border-l border-gray-800">
          <div className="border-b border-gray-800">
            <MarketSidebar />
          </div>
          <div className="flex-1 overflow-hidden">
            <MarketTrades symbol={symbol} />
          </div>
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
