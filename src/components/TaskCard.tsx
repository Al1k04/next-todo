"use client";
import { Edit, Trash } from "lucide-react";
import { deleteTask } from "@/actions/taskAction";
import toast from "react-hot-toast";

export default function TaskCard({
  title,
  description,
  id,
  categoryName,
  onEdit,
}: {
  title: string;
  description: string;
  id: string;
  categoryName?: string | null;
  onEdit: () => void;
}) {
  async function handleDelete(id: string) {
    await deleteTask(id);
    toast.success("Task deleted");
  }
  return (
    <div className="border border-gray-600 rounded-xl p-4 w-full">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{title}</p>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center  gap-2 border border-gray-600 rounded-xl py-2 px-4 hover:bg-gray-700 transition-all duration-150 cursor-pointer"
          >
            <Edit size={20} className="text-gray-400 " /> Edit
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="flex items-center  gap-2  border border-gray-600 rounded-xl py-2 px-4  hover:bg-gray-700 transition-all duration-150   cursor-pointer"
          >
            <Trash size={20} className="text-gray-400" /> Delete
          </button>
        </div>
      </div>
      <p className="text-gray-400">{description}</p>
      {categoryName && (
        <span className="bg-purple-900 text-purple-200 text-sm py-1 px-3 rounded-full mt-2 inline-block">
          {categoryName}
        </span>
      )}
    </div>
  );
}
