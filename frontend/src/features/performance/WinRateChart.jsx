import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function WinRateChart({ winningTrades, losingTrades }) {
  const data = [
    { name: "Win", value: winningTrades },
    { name: "Loss", value: losingTrades },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="mb-4 text-lg">Win vs Loss</h3>

      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
