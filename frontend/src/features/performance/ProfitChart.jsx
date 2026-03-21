import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ProfitChart({ trades }) {
  const data = trades.map((trade) => ({
    date: trade.createdAt?.slice(0, 10),
    profit: trade.profit,
  }));

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="mb-4 text-lg">Profit Over Time</h3>

      <LineChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#333" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="profit" stroke="#22c55e" />
      </LineChart>
    </div>
  );
}
