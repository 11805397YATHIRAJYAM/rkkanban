import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskModal = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks();
  const [draft, setDraft] = useState(task);

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateTask(draft);
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Task Details</h2>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-600 hover:bg-slate-200"
          >
            X
          </button>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold">Title</span>
            <input
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              value={draft.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Description</span>
            <textarea
              className="min-h-32 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              value={draft.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold">Status</span>
              <select
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                value={draft.status}
                onChange={(e) => updateField("status", e.target.value)}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold">Priority</span>
              <select
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                value={draft.priority}
                onChange={(e) => updateField("priority", e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold">Deadline</span>
              <input
                type="date"
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                value={draft.deadline}
                onChange={(e) => updateField("deadline", e.target.value)}
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold">Tags</span>
            <input
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
              value={draft.tags}
              onChange={(e) => updateField("tags", e.target.value)}
              placeholder="React, GUVI, UI"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-50 px-5 py-3 font-bold text-red-600 hover:bg-red-100"
          >
            Delete Task
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
