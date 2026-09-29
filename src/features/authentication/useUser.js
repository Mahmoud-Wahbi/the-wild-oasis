import { useQuery } from "@tanstack/react-query";
import { getCuurentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCuurentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
