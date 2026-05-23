"use client";
import { ArrowRight, Library, Edit, Trash } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col  items-center">
      <h2 className="text-center mt-30 text-lg  bg-blue-200 text-blue-600 py-2 px-4 rounded-full">
        Stay focused. Get things done.
      </h2>
      <p className=" text-white mt-10 text-center text-5xl/snug">
        Your tasks, <br /> organized your way
      </p>
      <p className="text-white mt-10 text-center text-2xl/snug">
        Stop juggling sticky notes and forgotten lists. Taskly keeps <br />{" "}
        everything in one place so you can focus on what matters.
      </p>
      <div className="mt-10 gap-2  bg-blue-900 py-2 px-8 rounded-full text-xl hover:bg-blue-500 duration-200  cursor-pointer">
        <Link className="flex items-center gap-2" href={"/tasks"}>
          <ArrowRight size={22} />
          Start managing tasks
        </Link>
      </div>
      <p className="mt-5 text-gray-400">Free to use. No credit card needed.</p>
      <div className="flex gap-22 mt-20">
        <div className="flex gap-2  py-2 px-4 border-y border-gray-400 text-gray-500">
          <Library size={20} className="text-gray-400" /> Categoy
        </div>
        <div className="flex gap-2  py-2 px-4 border-y border-gray-400 text-gray-500">
          <Edit size={20} className="text-gray-400 " /> Edit Task
        </div>
        <div className="flex gap-2  py-2 px-4 border-y border-gray-400 text-gray-500">
          <Trash size={20} className="text-gray-400" /> Delete Task
        </div>
      </div>
    </main>
  );
}
