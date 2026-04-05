import { useStore } from "../store/useStore";
import { useState } from "react";

export default function TransactionTable() {
  const {
    transactions,
    role,
    deleteTransaction,
    updateTransaction,
    search,
    filter,
    setSearch,
    setFilter,
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    category,
    setCategory,
  } = useStore();

  // ✅ MUST be inside component
  const [editData, setEditData] = useState<any>(null);

  // 🔥 FILTER LOGIC
  const filteredData = transactions.filter((t) => {
    const matchSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter = filter === "all" || t.type === filter;

    const matchCategory =
      category === "all" || t.category === category;

    const txDate = new Date(t.date);
    const matchFrom = dateFrom ? txDate >= new Date(dateFrom) : true;
    const matchTo = dateTo ? txDate <= new Date(dateTo) : true;

    return (
      matchSearch &&
      matchFilter &&
      matchCategory &&
      matchFrom &&
      matchTo
    );
  });

  return (
    <div className="card">
      <h3>Transactions</h3>

      {/* 🔍 FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
        <input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Freelance">Freelance</option>
        </select>

        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      </div>

      {/* ❗ EMPTY */}
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
              {role === "admin" && <th>Actions</th>}
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
                  <td className="action-cell">
                    <button
                      className="edit-btn"
                      onClick={() => setEditData(t)}
                    >
                      Edit
                    </button>

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

      {/* 🧾 EDIT MODAL */}
      {editData && (
        <div className="modal-overlay">
          <div className="modal modern-modal">
            <h2>Edit Transaction</h2>

            {/* DATE */}
            <input
              type="date"
              value={editData.date}
              onChange={(e) =>
                setEditData({ ...editData, date: e.target.value })
              }
            />

            {/* AMOUNT */}
            <input
              type="number"
              value={editData.amount}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  amount: Number(e.target.value),
                })
              }
            />

            {/* CATEGORY (DROPDOWN like Add) */}
            <select
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
            >
              <option>Salary</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Transport</option>
              <option>Rent</option>
              <option>Freelance</option>
            </select>

            {/* TYPE */}
            <select
              value={editData.type}
              onChange={(e) =>
                setEditData({ ...editData, type: e.target.value })
              }
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* ACTIONS */}
            <div className="modal-actions">
              <button
                className="add-btn"
                onClick={() => {
                  updateTransaction(editData);
                  setEditData(null);
                }}
              >
                Update
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}