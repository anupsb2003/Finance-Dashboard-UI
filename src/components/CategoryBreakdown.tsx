import { useStore } from "../store/useStore";

export default function CategoryBreakdown() {
  const { transactions } = useStore();

  // 🔥 Calculate category totals (expenses only)
  const categoryMap: any = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

  // Convert to array + sort
  const data = Object.entries(categoryMap)
    .map(([category, amount]) => ({
      category,
      amount: amount as number,
    }))
    .sort((a, b) => b.amount - a.amount);

  const total = data.reduce((a, b) => a + b.amount, 0);

  const colors = [
    "#ec4899", // pink
    "#f97316", // orange
    "#6366f1", // indigo
    "#14b8a6", // teal
    "#a855f7", // purple
    "#f59e0b", // yellow
    "#3b82f6", // blue
    "#10b981", // green
    "#84cc16", // lime
  ];

  return (
    <div className="card">
      <h3>Full Category Breakdown</h3>

      <div className="category-list">
        {data.map((item, index) => {
          const percent = ((item.amount / total) * 100).toFixed(0);
          const width = (item.amount / data[0].amount) * 100;

          return (
            <div key={index} className="category-row">
              
              {/* LEFT SIDE */}
              <div className="category-left">
                <span className="rank">{index + 1}</span>

                <span
                  className="dot"
                  style={{ background: colors[index % colors.length] }}
                />

                <span className="name">{item.category}</span>
              </div>

              {/* BAR */}
              <div className="category-bar">
                <div
                  className="fill"
                  style={{
                    width: `${width}%`,
                    background: colors[index % colors.length],
                  }}
                />
              </div>

              {/* RIGHT SIDE */}
              <div className="category-right">
                <span>₹{item.amount.toLocaleString()}</span>
                <span className="percent">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}