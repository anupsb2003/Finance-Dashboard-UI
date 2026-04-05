import { useState } from "react";
import { useStore } from "../store/useStore";
import RoleSwitcher from "../components/RoleSwitcher";
import AddTransaction from "../components/AddTransaction";

export default function Header({ theme, setTheme }: any) {
  const { role } = useStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="header">
        <div className="navbar">
          <h2>Finance Dashboard</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <RoleSwitcher />

            {role === "admin" && (
              <button onClick={() => setShowModal(true)}>
                + Add
              </button>
            )}

            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 OUTSIDE HEADER (IMPORTANT) */}
      {showModal && (
        <AddTransaction onClose={() => setShowModal(false)} />
      )}
    </>
  );
}