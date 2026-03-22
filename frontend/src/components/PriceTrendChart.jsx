import { useHistoricalData } from "../hooks/useHistoricalData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PriceTrendChart({ symbol }) {
  const { data = [] } = useHistoricalData(symbol);

  return (
    <div className="bg-[#0f1116] p-6 rounded-xl">
      <h3 className="mb-4">{symbol} Price Trend (Last 50 Hours)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#16c784"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
