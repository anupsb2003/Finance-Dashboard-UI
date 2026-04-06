import { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Transactions from "./pages/Transactions";
import AddTransaction from "./components/AddTransaction"; // ✅ IMPORT

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [showModal, setShowModal] = useState(false);

  // 🌙 Theme handler
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app">
      
      {/* 🔥 SIDEBAR */}
      <Sidebar
        setPage={setPage}
        theme={theme}
        setTheme={setTheme}
        openModal={() => setShowModal(true)} // ✅ FIX
      />

      {/* 🔥 MAIN CONTENT */}
      <div className="main">
        
        {/* 🔥 HEADER */}
        <Header
          theme={theme}
          setTheme={setTheme}
          openModal={() => setShowModal(true)} // ✅ ALSO FIX HEADER
        />

        {/* 🔥 PAGES */}
        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}
      </div>

      {/* 🔥 GLOBAL MODAL (MOST IMPORTANT FIX) */}
      {showModal && (
        <AddTransaction onClose={() => setShowModal(false)} />
      )}

    </div>
  );
}