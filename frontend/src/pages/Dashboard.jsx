import MarketCard from "../features/dashboard/MarketCard";

export default function Dashboard() {
  return (
    <div className="bg-[#1d2631]">
      <div className="grid grid-cols-2 gap-6">
        <MarketCard title="Hot Coins" sortBy="volume" />
        <MarketCard title="Top Gainers" sortBy="gainers" />
        <MarketCard title="Top Losers" sortBy="losers" />
        <MarketCard title="Top Volume" sortBy="volume" />
      </div>
    </div>
  );
}
