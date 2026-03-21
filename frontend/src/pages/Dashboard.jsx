import { useState } from "react";
import { useMarketData } from "../hooks/useMarketData";
import MarketCard from "../features/dashboard/MarketCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [market, setMarket] = useState("CRYPTO");

  const { data = [] } = useMarketData(market);

  const gainers = [...data]
    .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
    .slice(0, 100);

  const losers = [...data]
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 100);

  const hot = [...data]
    .sort((a, b) => b.quoteVolume - a.quoteVolume)
    .slice(0, 100);

  const volume = [...data]
    .sort((a, b) => b.quoteVolume - a.quoteVolume)
    .slice(0, 100);

  return (<>
    <Navbar/>
    <div className="bg-[#1d2631]">
      {/* Filter */}
      <div>
        <select
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          style={dropdown}
        >
          <option value="CRYPTO">Crypto</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="BNB">BNB</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <MarketCard title="Hot Coins" coins={hot} />
        <MarketCard title="Top Gainers" coins={gainers} />
        <MarketCard title="Top Losers" coins={losers} />
        <MarketCard title="Top Volume" coins={volume} />
      </div>
    </div>
    </>
  );
}

const dropdown = {
  background: "#0f1116",
  color: "white",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
};
