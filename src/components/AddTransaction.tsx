import { useState } from "react";
import { useStore } from "../store/useStore";

type Props = {
  onClose: () => void;
};

export default function AddTransaction({ onClose }: Props) {
  const { addTransaction } = useStore();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) return;

    addTransaction({
      id: 0,
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type as "income" | "expense",
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Transaction</h2>

        <input type="date" onChange={(e)=>setForm({...form,date:e.target.value})}/>
        <input type="number" placeholder="Amount" onChange={(e)=>setForm({...form,amount:e.target.value})}/>
        <input type="text" placeholder="Category" onChange={(e)=>setForm({...form,category:e.target.value})}/>

        <select onChange={(e)=>setForm({...form,type:e.target.value})}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}