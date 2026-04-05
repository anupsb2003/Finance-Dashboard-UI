import { useStore } from "../store/useStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CategoryBreakdown from "../components/CategoryBreakdown";
export default function Insights() {
  const { transactions } = useStore();

  // 🔥 CATEGORY SPENDING
  const categoryMap: any = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

  const categoryData = Object.entries(categoryMap)
    .map(([category, amount]) => ({
      category,
      amount: amount as number,
    }))
    .sort((a, b) => b.amount - a.amount);

  const topCategory = categoryData[0];

  // 🔥 INCOME & EXPENSE TOTAL
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savingsRate = ((income - expense) / income) * 100;

  // 🔥 MONTHLY COMPARISON (March vs April)
  const getMonthData = (month: number) => {
    const data = transactions.filter(
      (t) => new Date(t.date).getMonth() === month
    );

    return {
      income: data
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
      expense: data
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    };
  };

  const march = getMonthData(2);
  const april = getMonthData(3);

  const comparisonData = [
    {
      name: "Income",
      March: march.income,
      April: april.income,
    },
    {
      name: "Expense",
      March: march.expense,
      April: april.expense,
    },
  ];

  // 🔥 MOST ACTIVE MONTH
  const monthMap: any = {};
  transactions.forEach((t) => {
    const m = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthMap[m] = (monthMap[m] || 0) + t.amount;
  });

  const mostActive = Object.entries(monthMap).sort(
    (a: any, b: any) => b[1] - a[1]
  )[0];

  return (
    <div className="container">
      <h2>Insights</h2>

      {/* 🔥 TOP CARDS */}
      <div className="insight-grid">
        <div className="insight-card">
          <p className="muted">TOP SPENDING CATEGORY</p>
          <h3>{topCategory?.category}</h3>
          <p>₹{topCategory?.amount}</p>
        </div>

        <div className="insight-card">
          <p className="muted">SAVINGS RATE</p>
          <h3>{savingsRate.toFixed(0)}%</h3>
        </div>

        <div className="insight-card">
          <p className="muted">NET SAVINGS</p>
          <h3>₹{income - expense}</h3>
        </div>

        <div className="insight-card">
          <p className="muted">MOST ACTIVE MONTH</p>
          <h3>{mostActive?.[0]}</h3>
        </div>

        <div className="insight-card">
          <p className="muted">AVG MONTHLY INCOME</p>
          <h3>₹{(income / 12).toFixed(0)}</h3>
        </div>
      </div>

      {/* 🔥 MONTHLY COMPARISON */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Monthly Comparison</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={comparisonData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="March" fill="#6366f1" />
            <Bar dataKey="April" fill="#a855f7" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 CATEGORY BREAKDOWN */}
      
      <CategoryBreakdown />
    </div>
  );
}