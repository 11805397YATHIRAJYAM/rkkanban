import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ status, tasks, onOpenTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      className={`min-h-[520px] rounded-3xl border p-4 shadow-2xl backdrop-blur transition ${
        isOver
          ? "border-green-400 bg-green-100/90"
          : "border-white/20 bg-white/85"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">{status}</h2>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center text-sm font-semibold text-slate-500">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onOpenTask={onOpenTask} />
          ))
        )}
      </div>
    </section>
  );
};

export default Column;
