"use client";

import Modal from "./Modal";
import { Clipboard } from "lucide-react";
import { useState } from "react";
import type { Category, Task } from "@/generated/prisma/client";
import TaskCard from "./TaskCard";

type TaskWithCategory = Task & {
  categories: Category | null;
};

export default function TaskClient({
  tasks,
  categories,
}: {
  tasks: TaskWithCategory[];
  categories: Category[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  return (
    <div className="w-full px-4 sm:px-6 py-5">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto my-10">
        <h1 className="text-2xl sm:text-3xl font-bold">My tasks</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="border border-gray-400 font-bold py-2 px-4 text-sm sm:text-base rounded-xl hover:bg-white hover:text-gray-800 transition-all duration-150 cursor-pointer w-full sm:w-auto"
        >
          Add task
        </button>

        {/* CREATE MODAL */}
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)} categories={categories} />
        )}

        {/* EDIT MODAL */}
        {editTask && (
          <Modal
            task={editTask}
            onClose={() => setEditTask(null)}
            categories={categories}
          />
        )}
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center px-4">
          <div className="bg-gray-700 p-3 rounded-full">
            <Clipboard size={30} />
          </div>

          <p className="mt-8 text-base sm:text-lg text-gray-400">
            Your task list is empty
          </p>

          <p className="mt-2 text-sm sm:text-lg text-yellow-100">
            Click "Add task" to create your first task
          </p>
        </div>
      ) : (
        /* TASKS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              categoryName={task.categories?.title}
              id={task.id}
              title={task.title}
              description={task.description}
              onEdit={() => setEditTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
