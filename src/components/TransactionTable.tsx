import { useStore } from "../store/useStore";

export default function TransactionTable() {
  const {
    transactions,
    role,
    deleteTransaction,
    search,
    filter,
    setSearch,
    setFilter,
  } = useStore();

  // 🔥 FILTER LOGIC
  const filteredData = transactions.filter((t) => {
    const matchSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || t.type === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="card">
      <h3>Transactions</h3>

      {/* 🔍 SEARCH + FILTER */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "6px" }}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* ❗ EMPTY STATE */}
      {filteredData.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>

                <td className={t.type === "income" ? "income" : "expense"}>
                  {t.type}
                </td>

                {role === "admin" && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        if (confirm("Delete this transaction?")) {
                          deleteTransaction(t.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}