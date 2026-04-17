import React from "react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const style = {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "0.4rem 0.85rem",
    borderRadius: 8,
    border: isDark ? "1px solid #2e2e34" : "1px solid #dddbd5",
    backgroundColor: isDark ? "#1e1e22" : "#f6f5f3",
    color: isDark ? "#888" : "#888",
    fontSize: "0.8rem",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  };

  return (
    <button style={style} onClick={toggleTheme}>
      {isDark ? "☀ Light" : "☾ Dark"}
    </button>
  );
}

export default ThemeToggleButton;