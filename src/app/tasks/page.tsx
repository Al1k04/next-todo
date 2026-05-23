import prisma from "@/lib/prisma";
import TaskClient from "@/components/TaskClient";
import { auth } from "@/auth";

export default async function Tasks() {
  const session = await auth();
  const tasks = await prisma.task.findMany({
    where: { userId: session?.user?.id },
    include: { categories: true },
  });
  const categories = await prisma.category.findMany();
  return <TaskClient tasks={tasks} categories={categories} />;
}
