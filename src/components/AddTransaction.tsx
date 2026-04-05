import { useState } from "react";
import { useStore } from "../store/useStore";

type Props = {
  onClose: () => void;
};

export default function AddTransaction({ onClose }: Props) {
  const { addTransaction, transactions } = useStore();

  // 🔥 Get unique categories from existing data
  const categories = Array.from(
    new Set(transactions.map((t) => t.category))
  );

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    customCategory: "",
    type: "expense",
  });

  const isOther = form.category === "Other";

  const handleSubmit = () => {
    const finalCategory = isOther ? form.customCategory : form.category;

    if (!form.date || !form.amount || !finalCategory) {
      alert("Please fill all fields");
      return;
    }

    addTransaction({
      id: 0,
      date: form.date,
      amount: Number(form.amount),
      category: finalCategory,
      type: form.type as "income" | "expense",
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal modern-modal">
        <h2>Add Transaction</h2>

        {/* DATE */}
        <input
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* CATEGORY SELECT */}
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}

          <option value="Other">Other</option>
        </select>

        {/* CUSTOM CATEGORY */}
        {isOther && (
          <input
            type="text"
            placeholder="Enter new category"
            onChange={(e) =>
              setForm({ ...form, customCategory: e.target.value })
            }
          />
        )}

        {/* TYPE */}
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* BUTTONS */}
        <div className="modal-actions">
          <button className="add-btn" onClick={handleSubmit}>
            Add
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}