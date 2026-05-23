"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TitleSchema = z.object({
  title: z.string().min(1, "Title is required").max(10, "Max 10 chrachters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Max 100 chrachters"),
});

export async function createTask(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  console.log(session);
  if (!session || !userId) {
    return redirect("/api/auth/signin");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  const result = TitleSchema.safeParse({ title, description, category });
  console.log(result);
  if (!result.success) {
    const message = result.error?.issues?.[0]?.message ?? "Validation failed";
    return { error: message };
  }

  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
      categoryId: category || null,
      userId: userId,
    },
  });

  revalidatePath("/tasks");
}

export async function deleteTask(id: string) {
  const session = await auth();
  if (!session) {
    return redirect("/api/auth/signin");
  }

  const deletedTask = await prisma.task.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/tasks");
}

export async function updateTask(
  title: string,
  id: string,
  description: string,
) {
  const session = await auth();
  if (!session) {
    return redirect("/api/auth/signin");
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      title: title,
      description: description,
    },
  });
  revalidatePath("/tasks");
}
