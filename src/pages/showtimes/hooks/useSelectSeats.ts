import { useState } from "react";
import { type Seat } from "./useGetSeatMap";

export const useSelectSeats = () => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const toggleSeat = (seat: Seat) => {
    if (seat.isBooked || seat.type === "aisle") return;

    setSelectedSeatIds((prevIds) => {
      const isCurrentlySelected = prevIds.includes(seat.id);

      if (isCurrentlySelected) {
        return prevIds.filter((id) => id !== seat.id);
      } else {
        return [...prevIds, seat.id];
      }
    });
  };

  const isSelected = (seatId: string) => selectedSeatIds.includes(seatId);

  return { selectedSeatIds, toggleSeat, isSelected };
};
