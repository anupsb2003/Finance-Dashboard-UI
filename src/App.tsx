import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState("light");

  // Apply theme to HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        {/* Left side (Navigation) */}
        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("insights")}>
            Insights
          </button>
        </div>

        {/* Right side (Theme Toggle) */}
        <button
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* Pages */}
      {page === "dashboard" && <Dashboard />}
      {page === "insights" && <Insights />}
    </>
  );
}