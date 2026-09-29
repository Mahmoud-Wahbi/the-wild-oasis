import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking } from "../../services/apiBookings";

export function useAddBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: addBooking,
    mutateAsync: addBookingAsync,
    data: newBooking,
    isPending: isAdding,
    error,
  } = useMutation({
    mutationFn: (newBooking) => createBooking(newBooking),

    onSuccess: () => {
      toast.success("Booking has been added successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addBooking, addBookingAsync, newBooking, isAdding, error };
}
