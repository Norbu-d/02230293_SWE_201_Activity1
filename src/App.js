import React from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();

  const isDark = theme === "dark";

  const styles = {
    app: {
      minHeight: "100vh",
      backgroundColor: isDark ? "#0f0f11" : "#f6f5f3",
      color: isDark ? "#e8e6e1" : "#1a1a1a",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.25rem 2rem",
      borderBottom: isDark ? "1px solid #2a2a2e" : "1px solid #e2e0da",
      backgroundColor: isDark ? "#17171a" : "#ffffff",
    },
    logo: {
      fontSize: "1.1rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: isDark ? "#e8e6e1" : "#1a1a1a",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoAccent: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "#6c63ff",
      display: "inline-block",
    },
    container: {
      maxWidth: 640,
      margin: "0 auto",
      padding: "2rem 1.5rem",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
      marginBottom: "1.75rem",
    },
    statCard: {
      backgroundColor: isDark ? "#1e1e22" : "#ffffff",
      border: isDark ? "1px solid #2a2a2e" : "1px solid #e2e0da",
      borderRadius: 12,
      padding: "0.85rem 1rem",
      textAlign: "center",
    },
    statNum: {
      fontSize: "1.6rem",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      color: isDark ? "#e8e6e1" : "#1a1a1a",
      lineHeight: 1.2,
    },
    statLabel: {
      fontSize: "0.72rem",
      color: isDark ? "#666" : "#999",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginTop: 3,
    },
    inputCard: {
      backgroundColor: isDark ? "#1e1e22" : "#ffffff",
      border: isDark ? "1px solid #2a2a2e" : "1px solid #e2e0da",
      borderRadius: 14,
      padding: "1.25rem",
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      color: isDark ? "#555" : "#aaa",
      marginBottom: "1rem",
    },
    taskList: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    taskItem: (done) => ({
      display: "flex",
      alignItems: "center",
      gap: 12,
      backgroundColor: isDark ? "#1e1e22" : "#ffffff",
      border: isDark ? "1px solid #2a2a2e" : "1px solid #e2e0da",
      borderRadius: 10,
      padding: "0.8rem 1rem",
      transition: "opacity 0.2s",
      opacity: done ? 0.5 : 1,
    }),
    checkbox: {
      width: 18,
      height: 18,
      flexShrink: 0,
      accentColor: "#6c63ff",
      cursor: "pointer",
    },
    taskTitle: (done) => ({
      flex: 1,
      fontSize: "0.92rem",
      textDecoration: done ? "line-through" : "none",
      color: isDark ? "#c8c5c0" : "#2a2a2a",
    }),
    priorityBadge: (priority) => {
      const map = {
        high:   { bg: isDark ? "#3a1a1a" : "#fff0ee", color: isDark ? "#f08080" : "#c0392b" },
        normal: { bg: isDark ? "#1a2a3a" : "#eef4ff", color: isDark ? "#80b0f0" : "#2563eb" },
        low:    { bg: isDark ? "#1a2a1a" : "#eefbee", color: isDark ? "#80c880" : "#16a34a" },
      };
      const s = map[priority] || map.normal;
      return {
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: 6,
        backgroundColor: s.bg,
        color: s.color,
      };
    },
    clearBtn: {
      marginTop: "1.25rem",
      width: "100%",
      padding: "0.6rem",
      border: isDark ? "1px solid #3a3a40" : "1px solid #e2e0da",
      borderRadius: 8,
      backgroundColor: "transparent",
      color: isDark ? "#888" : "#999",
      fontSize: "0.82rem",
      cursor: "pointer",
      transition: "all 0.15s",
    },
    emptyState: {
      textAlign: "center",
      padding: "2.5rem 0",
      color: isDark ? "#444" : "#bbb",
      fontSize: "0.9rem",
    },
  };

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;

  return (
    <div style={styles.app}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.logo}>
          <span style={styles.logoAccent} />
          Reactive Task Board
        </div>
        <ThemeToggleButton />
      </div>

      <div style={styles.container}>
        {/* Stats */}
        <div style={styles.statsRow}>
          {[["Total", total], ["Active", active], ["Done", done]].map(([label, val]) => (
            <div key={label} style={styles.statCard}>
              <div style={styles.statNum}>{val}</div>
              <div style={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={styles.inputCard}>
          <div style={styles.sectionTitle}>New task</div>
          <TaskInput
            onAddTask={(task) =>
              dispatch({ type: "ADD_TASK", task: { ...task, done: false } })
            }
            isDark={isDark}
          />
        </div>

        {/* Task List */}
        <div style={styles.sectionTitle}>Tasks</div>

        {tasks.length === 0 ? (
          <div style={styles.emptyState}>No tasks yet — add one above</div>
        ) : (
          <>
            <div style={styles.taskList}>
              {tasks.map((t) => (
                <div key={t.id} style={styles.taskItem(t.done)}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={t.done}
                    onChange={() => dispatch({ type: "TOGGLE_DONE", id: t.id })}
                  />
                  <span style={styles.taskTitle(t.done)}>{t.title}</span>
                  <span style={styles.priorityBadge(t.priority)}>{t.priority}</span>
                </div>
              ))}
            </div>

            {done > 0 && (
              <button
                style={styles.clearBtn}
                onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
                onMouseEnter={(e) => {
                  e.target.style.color = isDark ? "#f08080" : "#c0392b";
                  e.target.style.borderColor = isDark ? "#5a2a2a" : "#fcc";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isDark ? "#888" : "#999";
                  e.target.style.borderColor = isDark ? "#3a3a40" : "#e2e0da";
                }}
              >
                Clear {done} completed task{done !== 1 ? "s" : ""}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;