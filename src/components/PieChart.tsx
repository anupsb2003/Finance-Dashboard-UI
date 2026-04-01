import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function PieChartComp() {
  const data = [
    { name: "Food", value: 400 },
    { name: "Rent", value: 800 },
    { name: "Shopping", value: 300 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

  return (
    <div className="card">
      <h3>Spending</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}