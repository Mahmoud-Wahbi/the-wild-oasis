import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuests";

export function useAddGuest() {
  const queryClient = useQueryClient();

  const {
    mutate: addGuest,
    mutateAsync: addGuestAsync,
    data: newGuest,
    isPending: isAdding,
    error,
  } = useMutation({
    mutationFn: (newGuest) => createGuest(newGuest),

    onSuccess: () => {
      toast.success("Guest has been added successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addGuest, addGuestAsync, newGuest, isAdding, error };
}
