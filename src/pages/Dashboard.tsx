import { useState } from "react";
import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import Chart from "../components/Chart";
import PieChartComp from "../components/PieChart";
import BalanceChart from "../components/BalanceChart";
import AddTransaction from "../components/AddTransaction";


import CategoryBarChart from "../components/CategoryBarChart";
export default function Dashboard() {
  const { transactions } = useStore();
  const [showModal, setShowModal] = useState(false);

  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="container">
      <div className="grid-3">
        <SummaryCard title="Balance" value={income - expense} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <div className="grid-2">
        <Chart />
        <PieChartComp />
      </div>
      <CategoryBarChart />
      <div className="grid-2">
        <BalanceChart /> {/* balance */}
      </div>

      {showModal && <AddTransaction onClose={() => setShowModal(false)} />}
    </div>
  );
}