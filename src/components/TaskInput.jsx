import React, { useState } from "react";

function TaskInput({ onAddTask, isDark }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    setTitle("");
    setPriority("normal");
  };

  const inputStyle = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    borderRadius: 8,
    border: isDark ? "1px solid #2e2e34" : "1px solid #dddbd5",
    backgroundColor: isDark ? "#141416" : "#f9f8f6",
    color: isDark ? "#e8e6e1" : "#1a1a1a",
    fontSize: "0.92rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    marginBottom: 10,
  };

  const rowStyle = {
    display: "flex",
    gap: 8,
    alignItems: "center",
  };

  const selectStyle = {
    flex: "0 0 110px",
    padding: "0.62rem 0.75rem",
    borderRadius: 8,
    border: isDark ? "1px solid #2e2e34" : "1px solid #dddbd5",
    backgroundColor: isDark ? "#141416" : "#f9f8f6",
    color: isDark ? "#c8c5c0" : "#3a3a3a",
    fontSize: "0.88rem",
    fontFamily: "inherit",
    outline: "none",
    cursor: "pointer",
  };

  const addBtnStyle = {
    flex: 1,
    padding: "0.62rem 1rem",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#6c63ff",
    color: "#fff",
    fontSize: "0.88rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.01em",
    transition: "background 0.15s",
  };

  const clearBtnStyle = {
    flex: "0 0 auto",
    padding: "0.62rem 0.85rem",
    borderRadius: 8,
    border: isDark ? "1px solid #2e2e34" : "1px solid #dddbd5",
    backgroundColor: "transparent",
    color: isDark ? "#666" : "#aaa",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <div style={rowStyle}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={selectStyle}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          style={addBtnStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#574fd6")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c63ff")}
        >
          Add task
        </button>
        <button
          type="button"
          onClick={() => setTitle("")}
          style={clearBtnStyle}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default TaskInput;