import { useState } from "react";
import {
  FiGrid,
  FiCreditCard,
  FiPieChart,
  FiMoon,
  FiSun,
  FiPlus,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { useStore } from "../store/useStore";
import RoleSwitcher from "../components/RoleSwitcher";

export default function Sidebar({ setPage, theme, setTheme, openModal }: any) {
  const { role } = useStore();
  const [active, setActive] = useState("dashboard");

  const handleClick = (page: string) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div className="sidebar">
      
      {/* 🔥 LOGO */}
      <div className="logo-box">
        <div className="logo-icon">
          <BsLightningFill />
        </div>
        <div>
          <h2>Zoryvn</h2>
          <p className="muted">FINTECH</p>
        </div>
      </div>

      {/* 🔥 NAVIGATION */}
      <div className="nav-section">
        <p className="section-title">NAVIGATION</p>

        <button
          className={active === "dashboard" ? "nav-item active" : "nav-item"}
          onClick={() => handleClick("dashboard")}
        >
          <FiGrid className="icon" />
          Overview
        </button>

        <button
          className={active === "transactions" ? "nav-item active" : "nav-item"}
          onClick={() => handleClick("transactions")}
        >
          <FiCreditCard className="icon" />
          Transactions
        </button>

        <button
          className={active === "insights" ? "nav-item active" : "nav-item"}
          onClick={() => handleClick("insights")}
        >
          <FiPieChart className="icon" />
          Insights
        </button>

        {/* 🔥 ADD BUTTON */}
        {role === "admin" && (
          <button
            className="nav-item add-btn"
            onClick={openModal} // ✅ FIX HERE
          >
            <FiPlus className="icon" />
            Add Transaction
          </button>
        )}
      </div>

      {/* 🔥 BOTTOM */}
      <div className="bottom-section">
        <p className="section-title">ROLE</p>

        <div className="role-card">
          <FaCrown className="icon" />
          <RoleSwitcher />
        </div>

        {/* 🔥 THEME */}
        <div className="theme-toggle">
          <div className="theme-left">
            {theme === "dark" ? <FiMoon /> : <FiSun />}
            <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
          </div>

          <div
            className={`switch ${theme}`}
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
}