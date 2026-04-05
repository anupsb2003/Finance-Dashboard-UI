import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../store/useStore";

export default function Chart() {
  const { transactions } = useStore();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // 🔥 Generate monthly balance
  const data = months.map((month, index) => {
  const monthData = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === index;
  });

  const income = monthData
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = monthData
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return {
    name: month,
    income,
    expense,
    balance: income - expense, // optional
  };
});

  return (
    <div className="card">
      <h3>📈 Monthly Balance</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />

  {/* 🟢 Income */}
  <Line
    type="monotone"
    dataKey="income"
    stroke="#22c55e"
    strokeWidth={3}
  />

  {/* 🔴 Expense */}
  <Line
    type="monotone"
    dataKey="expense"
    stroke="#ef4444"
    strokeWidth={3}
  />

  
</LineChart>
      </ResponsiveContainer>
    </div>
  );
}