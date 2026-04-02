import MarketCard from "../features/dashboard/MarketCard";

export default function Dashboard() {
  return (
    <div className="bg-[#1d2631] min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
        <MarketCard title="Hot Coins" sortBy="volume" />
        <MarketCard title="Top Gainers" sortBy="gainers" />
        <MarketCard title="Top Losers" sortBy="losers" />
        <MarketCard title="Top Volume" sortBy="volume" />
      </div>
    </div>
  );
}
