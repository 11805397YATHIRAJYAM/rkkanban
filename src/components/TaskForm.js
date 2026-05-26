import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const defaultForm = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  tags: "",
  deadline: ""
};

const TaskForm = () => {
  const { addTask } = useTasks();
  const [form, setForm] = useState(defaultForm);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) return;

    addTask({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags.trim()
    });

    setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-3xl border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur"
    >
      <h2 className="mb-4 text-2xl font-black text-slate-900">Add New Task</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <input
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
        />

        <select
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
          value={form.priority}
          onChange={(e) => updateField("priority", e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
          placeholder="Tags, e.g. React, UI"
          value={form.tags}
          onChange={(e) => updateField("tags", e.target.value)}
        />

        <input
          type="date"
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
          value={form.deadline}
          onChange={(e) => updateField("deadline", e.target.value)}
        />

        <button className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700">
          Add Task
        </button>
      </div>

      <textarea
        className="mt-4 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
        placeholder="Task description"
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
      />
    </form>
  );
};

export default TaskForm;
