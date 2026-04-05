import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "../store/useStore";

export default function PieChartComp() {
  const { transactions } = useStore();

  // 🔥 Get category-wise expense data
  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: any, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  // Convert object → array
  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // 🎨 Colors (auto loop)
  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#ec4899",
    "#a855f7",
    "#14b8a6",
    "#eab308",
    "#ef4444",
  ];

  return (
    <div className="card">
      <h3>Spending</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}