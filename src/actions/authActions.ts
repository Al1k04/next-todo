"use server";

import { signIn, signOut } from "@/auth";

export async function handleSignIn() {
  await signIn();
}

export async function handleSigout() {
  await signOut();
}
