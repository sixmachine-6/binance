import { useParams } from "react-router-dom";
import OrderBook from "../features/trade/OrderBook";
import Chart from "../features/trade/Chart";
import MarketSidebar from "../features/trade/MarketSidebar";
import PairHeader from "../features/trade/PairHeader";
import MarketTrades from "../features/trade/MarketTrades";
import TradePanel from "../features/trade/TradePanel";
import Navbar from "../components/Navbar";

export default function Trade() {
  const { symbol } = useParams();

  return (<>
  <Navbar/>
    <div className="h-screen flex flex-col bg-[#0b0e11] text-gray-200">
      <div className="border-b border-gray-800 bg-[#0b0e11]">
        <PairHeader symbol={symbol} />
      </div>
      <div className="grid grid-cols-[280px_1fr_320px] flex-1 gap-[1px] bg-gray-900">
        <div className="bg-[#0f1116] border-r border-gray-800 overflow-hidden">
          <OrderBook symbol={symbol} />
        </div>
        <div className="flex flex-col bg-[#0f1116]">
          <div className="border-b border-gray-800 p-3">
            <Chart symbol={symbol} />
          </div>
          <div className="p-4 flex justify-end">
            <TradePanel symbol={symbol} />
          </div>
        </div>
        <div className="flex flex-col bg-[#0f1116] border-l border-gray-800">
          <div className="border-b border-gray-800">
            <MarketSidebar />
          </div>
          <div className="flex-1 overflow-hidden">
            <MarketTrades symbol={symbol} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}