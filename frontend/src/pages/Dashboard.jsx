import MarketCard from "../features/dashboard/MarketCard";

export default function Dashboard() {
  return (
    <div className="bg-[#1d2631]">
      <div className="grid grid-cols-2 gap-6">
        <MarketCard title="Hot Coins" />
        <MarketCard title="Top Gainers" />
        <MarketCard title="Top Losers" />
        <MarketCard title="Top Volume" />
      </div>
    </div>
  );
}
