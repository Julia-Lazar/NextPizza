"use server"
import { signIn, signOut } from "@/auth";

export const login = async () => {
  // Placeholder for server-side login logic if needed
  await signIn("Credentials", { redirectTo: "/" });
}

export const logout = async () => {
  // Placeholder for server-side logout logic if needed
  await signOut({ redirectTo: "/" });
}