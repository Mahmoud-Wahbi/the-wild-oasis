import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const { data, isLoading, error } = useQuery({
    queryFn: getGuests,
    queryKey: ["guests"],
  });

  return { data, isLoading, error };
}
