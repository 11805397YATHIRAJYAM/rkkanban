import { DndContext, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import Column from "./Column";
import TaskModal from "./TaskModal";

const statuses = ["To Do", "In Progress", "Done"];

const Board = () => {
  const { tasks, moveTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    if (statuses.includes(over.id)) {
      moveTask(active.id, over.id);
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid gap-5 lg:grid-cols-3">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              onOpenTask={setSelectedTask}
            />
          ))}
        </div>
      </DndContext>

      {selectedTask && (
        <TaskModal
          task={tasks.find((task) => task.id === selectedTask.id) || selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
};

export default Board;
