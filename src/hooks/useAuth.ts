import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  return { session, isAuthenticated, isLoading };
}