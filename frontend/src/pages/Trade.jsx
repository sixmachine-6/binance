import { useParams } from "react-router-dom";
import OrderBook from "../features/trade/OrderBook";
import Chart from "../features/trade/Chart";
import MarketSidebar from "../features/trade/MarketSidebar";
import PairHeader from "../features/trade/PairHeader";
import MarketTrades from "../features/trade/MarketTrades";
import TradePanel from "../features/trade/TradePanel";

export default function Trade() {
  const { symbol } = useParams();

  return (
    <div className="h-screen flex flex-col bg-[#0f1116] text-white">
      <PairHeader symbol={symbol} />

      <div className="grid grid-cols-[300px_1fr_320px] flex-1">
        {/* ORDER BOOK */}
        <OrderBook symbol={symbol} />

        {/* CENTER AREA */}
        <div className="flex flex-col">
          <Chart symbol={symbol} />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col border-l border-gray-800">
          <MarketSidebar />

          <MarketTrades symbol={symbol} />
        </div>
      </div>
    </div>
  );
}
