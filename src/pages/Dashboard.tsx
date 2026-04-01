import { useState } from "react";
import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import Chart from "../components/Chart";
import PieChartComp from "../components/PieChart";
import TransactionTable from "../components/TransactionTable";
import AddTransaction from "../components/AddTransaction";
import RoleSwitcher from "../components/RoleSwitcher";

export default function Dashboard() {
  const { transactions, role } = useStore();
  const [showModal, setShowModal] = useState(false);

  const income = transactions.filter(t=>t.type==="income").reduce((a,b)=>a+b.amount,0);
  const expense = transactions.filter(t=>t.type==="expense").reduce((a,b)=>a+b.amount,0);

  return (
    <div className="container">

      <div className="navbar">
        <h2>Finance Dashboard</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <RoleSwitcher />

          {role === "admin" && (
            <button onClick={()=>setShowModal(true)}>+ Add</button>
          )}
        </div>
      </div>

      <div className="grid-3">
        <SummaryCard title="Balance" value={income-expense}/>
        <SummaryCard title="Income" value={income}/>
        <SummaryCard title="Expenses" value={expense}/>
      </div>

      <div className="grid-2">
        <Chart/>
        <PieChartComp/>
      </div>

      <TransactionTable/>

      {showModal && <AddTransaction onClose={()=>setShowModal(false)}/>}
    </div>
  );
}