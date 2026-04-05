import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useStore } from "../store/useStore";
import { Cell } from "recharts";
export default function BalanceChart() {
  const { transactions } = useStore();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const data = months.map((month, index) => {
    const monthData = transactions.filter(
      (t) => new Date(t.date).getMonth() === index
    );

    const income = monthData
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = monthData
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    return {
      name: month,
      balance: income - expense,
    };
  });

  return (
    <div className="card">
      <h3>💰 Monthly Balance</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* 🔵 Balance Bar */}
          <Bar
  dataKey="balance"
  radius={[6, 6, 0, 0]}
>
  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.balance >= 0 ? "#22c55e" : "#ef4444"}
    />
  ))}
</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}