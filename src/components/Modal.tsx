"use client";
import { CircleX } from "lucide-react";
import { createTask, updateTask } from "@/actions/taskAction";
import type { Task, Category } from "@prisma/client";
import toast from "react-hot-toast";

export default function Modal({
  onClose,
  task,
  categories,
}: {
  onClose: () => void;
  task?: Task;
  categories: Category[];
}) {
  const handleSubmit = async (formData: FormData) => {
    await createTask(formData);
    onClose();
  };
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/50">
      <div className="bg-gray-700 rounded-xl p-6 w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Add new task</h2>
          <button onClick={onClose} className="cursor-pointer">
            <CircleX />
          </button>
        </div>
        <form
          action={async (formData) => {
            if (task) {
              await updateTask(
                formData.get("title") as string,
                task.id,
                formData.get("description") as string,
              );
              toast.success("Task updated");
            } else {
              const result = await createTask(formData);
              if (result?.error) {
                toast.error(result.error);
                return;
              }
              toast.success("Task created");
            }
            onClose();
          }}
        >
          <input
            name="title"
            type="text"
            placeholder="title..."
            defaultValue={task?.title}
            className="border w-full mt-5 py-2 px-4 rounded-2xl placeholder-amber-50 outline-0"
          />

          <textarea
            name="description"
            className="border w-full mt-5 py-2 px-4 rounded-2xl placeholder-amber-50 outline-0 resize-none"
            placeholder="Enter description..."
            defaultValue={task?.description}
          ></textarea>
          <select
            name="category"
            className="border w-full mt-5 py-2 px-4 rounded-2xl placeholder-amber-50 outline-0"
          >
            <option value="">Select category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <div className="mt-10 flex justify-between">
            <button
              onClick={onClose}
              className="py-2 px-4 text-lg  bg-red-400 hover:bg-red-700 cursor-pointer transition-all duration-150 rounded-xl"
            >
              Cancel
            </button>
            <button className="py-2 px-4 text-lg  bg-green-400 hover:bg-green-700 cursor-pointer transition-all duration-150 rounded-xl">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
