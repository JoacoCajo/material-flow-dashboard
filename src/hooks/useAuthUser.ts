import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser, getToken, clearToken, CurrentUser } from "@/lib/auth";

export function useAuthUser() {
  const queryClient = useQueryClient();
  const token = getToken();

  const query = useQuery<CurrentUser | null>({
    queryKey: ["currentUser", token],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });

  const logout = () => {
    clearToken();
    queryClient.setQueryData(["currentUser"], null);
  };

  return { ...query, logout };
}
