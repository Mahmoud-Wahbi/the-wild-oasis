import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateBookingAsync, isPending: isUpdating } =
    useMutation({
      mutationFn: ({ id, booking }) => updateBooking(id, booking),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} has been updated successfully`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
      },
      onError: (error) => toast.error(error.message),
    });

  return { updateBookingAsync, isUpdating };
}
