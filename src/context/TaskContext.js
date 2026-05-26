import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TaskContext = createContext(null);
const STORAGE_KEY = "guvi_kanban_tasks";

const starterTasks = [
  {
    id: "task-1",
    title: "Design GUVI Kanban board",
    description: "Create a responsive board layout with To Do, In Progress, and Done columns.",
    status: "To Do",
    priority: "High",
    tags: "GUVI, React",
    deadline: ""
  },
  {
    id: "task-2",
    title: "Add drag and drop",
    description: "Use dnd-kit to move task cards smoothly between columns.",
    status: "In Progress",
    priority: "Medium",
    tags: "dnd-kit",
    deadline: ""
  },
  {
    id: "task-3",
    title: "Save data locally",
    description: "Use localStorage so tasks remain after refreshing the browser.",
    status: "Done",
    priority: "Low",
    tags: "localStorage",
    deadline: ""
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : starterTasks;
    } catch {
      return starterTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());

    setTasks((prev) => [...prev, { ...task, id }]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, moveTask }),
    [tasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }
  return context;
};
