import { useStore } from "../store/useStore";

export default function Insights() {
  const { transactions } = useStore();

  const expenses = transactions.filter(t => t.type === "expense");

  // Category grouping
  const grouped: any = {};
  expenses.forEach(t => {
    grouped[t.category] = (grouped[t.category] || 0) + t.amount;
  });

  const highest = Object.entries(grouped).sort(
    (a: any, b: any) => b[1] - a[1]
  )[0];

  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);
  const avgExpense = totalExpense / (expenses.length || 1);

  return (
    <div className="container">
      <h2>📊 Insights Dashboard</h2>

      {transactions.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="insight-grid">

          {/* Highest Category */}
          <div className="insight-card">
            <p className="muted">Highest Spending</p>
            <p className="highlight green">
              {highest?.[0] || "N/A"}
            </p>
          </div>

          {/* Average Expense */}
          <div className="insight-card">
            <p className="muted">Average Expense</p>
            <p className="highlight blue">
              ₹{avgExpense.toFixed(0)}
            </p>
          </div>

          {/* Total Expense */}
          <div className="insight-card">
            <p className="muted">Total Expense</p>
            <p className="highlight orange">
              ₹{totalExpense}
            </p>
          </div>

          {/* Smart Insight */}
          <div className="insight-card" style={{ gridColumn: "span 3" }}>
            <p className="muted">💡 Insight</p>
            <p style={{ marginTop: "10px" }}>
              You are spending most of your money on{" "}
              <b>{highest?.[0]}</b>. Consider optimizing this category to
              improve savings.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}