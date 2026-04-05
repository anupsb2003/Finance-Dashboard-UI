import { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Transactions from "./pages/Transactions";
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app"> {/* 🔥 IMPORTANT */}
      <Sidebar 
  setPage={setPage} 
  theme={theme} 
  setTheme={setTheme} 
/>

      <div className="main"> {/* 🔥 CONTENT ON RIGHT */}
        <Header theme={theme} setTheme={setTheme} />

        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}
      </div>
    </div>
  );
}