import { useState } from "react";
import { type TSelectedSeat } from "./useSelectSeats";

export type TSubmitSeatsDto = {
  userId: string;
  showtimeId: string;
  seatIds: string[];
};

export const useSubmitSeats = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSeats = async (
    selectedSeats: TSelectedSeat[],
    showtimeId: string,
    userId: string,
  ) => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload: TSubmitSeatsDto = {
        seatIds: selectedSeats.map((s) => s.seatId),
        showtimeId,
        userId,
      };
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to book seats");
      }

      alert(data.message || "Booking successful!");
      return data;
    } catch (error: any) {
      console.error("Booking Error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitSeats, isSubmitting };
};
