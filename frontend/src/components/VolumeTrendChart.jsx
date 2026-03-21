import { useHistoricalData } from "../hooks/useHistoricalData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function VolumeTrendChart({ symbol }) {
  const { data = [] } = useHistoricalData(symbol);

  return (
    <div className="bg-[#0f1116] p-6 rounded-xl">
      <h3 className="mb-4">{symbol} Volume Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="#f7931a"
            fill="#f7931a"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
