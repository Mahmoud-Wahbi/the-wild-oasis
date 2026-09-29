import { useQuery } from "@tanstack/react-query";
import { getGuestsForBooking } from "../../services/apiGuests";

export function useGuestsForBooking() {
  const { data, isLoading, error } = useQuery({
    queryFn: getGuestsForBooking,
    queryKey: ["guests", "booking"],
  });

  return { data, isLoading, error };
}
