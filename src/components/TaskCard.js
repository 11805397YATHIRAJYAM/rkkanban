import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTasks } from "../context/TaskContext";

const priorityClasses = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700"
};

const TaskCard = ({ task, onOpenTask }) => {
  const { deleteTask } = useTasks();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform)
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteTask(task.id);
  };

  const tags = task.tags
    ? task.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition hover:shadow-xl ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        className="mb-3 cursor-grab rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500 active:cursor-grabbing"
      >
        Drag task
      </div>

      <button
        type="button"
        onClick={() => onOpenTask(task)}
        className="block w-full text-left"
      >
        <h3 className="text-lg font-black text-slate-900">{task.title}</h3>
        <p className="mt-2 text-sm text-slate-600">
          {task.description || "No description added."}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClasses[task.priority]}`}>
            {task.priority}
          </span>

          {task.deadline && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              Due: {task.deadline}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </button>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onOpenTask(task)}
          className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white hover:bg-slate-700"
        >
          View / Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
