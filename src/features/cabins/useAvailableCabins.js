import { useQuery } from "@tanstack/react-query";
import { getAvalableCabins } from "../../services/apiCabins";

export function useAvailableCabins(startDate, endDate, excludeBookingId) {
  const isValidDate = (date) =>
    date instanceof Date && Number.isFinite(date.getTime());
  const hasValidDates =
    isValidDate(startDate) &&
    isValidDate(endDate) &&
    endDate.getTime() > startDate.getTime();

  const {
    data: cabins = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      "availableCabins",
      isValidDate(startDate) ? startDate.toISOString() : null,
      isValidDate(endDate) ? endDate.toISOString() : null,
      excludeBookingId || null,
    ],
    queryFn: () => getAvalableCabins({ startDate, endDate, excludeBookingId }),
    enabled: hasValidDates,
  });

  return { cabins, isLoading: isFetching, error };
}
