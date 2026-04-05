import { useStore } from "../store/useStore";

export default function CategoryBarChart() {
  const { transactions } = useStore();

  // 🔥 Calculate category totals (only expenses)
  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: any, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  // Convert to array + sort
  const data = Object.entries(categoryData)
    .map(([category, amount]) => ({
      category,
      amount: amount as number,
    }))
    .sort((a, b) => b.amount - a.amount);

  const max = Math.max(...data.map((d) => d.amount), 1);

  // 🎨 Colors (like your UI)
  const colors = [
    "#ec4899", // pink
    "#f97316", // orange
    "#6366f1", // indigo
    "#14b8a6", // teal
    "#a855f7", // purple
  ];

  return (
    <div className="card">
      <h3>Top Spending Categories</h3>

      <div style={{ marginTop: "15px" }}>
        {data.map((item, index) => {
          const width = (item.amount / max) * 100;

          return (
            <div key={item.category} style={{ marginBottom: "15px" }}>
              
              {/* Title + Amount */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px"
              }}>
                <span>{item.category}</span>
                <span>₹{item.amount.toLocaleString()}</span>
              </div>

              {/* Bar */}
              <div style={{
                width: "100%",
                height: "6px",
                background: "#1e293b",
                borderRadius: "10px",
                overflow: "hidden"
              }}>
                <div
                  style={{
                    width: `${width}%`,
                    height: "100%",
                    background: colors[index % colors.length],
                    borderRadius: "10px",
                    transition: "0.4s ease"
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}