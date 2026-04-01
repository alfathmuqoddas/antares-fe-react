import { type TSelectedSeat } from "./useSelectSeats";
import { useApiMutation } from "@/hooks/useApiMutation";

export type TSubmitSeatsDto = {
  userId: string;
  showtimeId: string;
  seatIds: string[];
};

export const useSubmitSeats = () => {
  const { trigger, isMutating: isSubmitting } = useApiMutation<
    { message: string },
    any,
    TSubmitSeatsDto
  >("/bookings", {
    method: "POST",
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (err) => {
      console.error("Booking Error:", err);
      alert("Error submitting booking");
    },
  });

  const submitSeats = async (
    selectedSeats: TSelectedSeat[],
    showtimeId: string,
    userId: string,
  ) => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    await trigger({
      seatIds: selectedSeats.map((s) => s.seatId),
      showtimeId,
      userId,
    });
  };

  return { submitSeats, isSubmitting };
};
