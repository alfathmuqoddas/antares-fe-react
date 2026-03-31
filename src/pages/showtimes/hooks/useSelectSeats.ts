import { useState } from "react";
import { type Seat } from "./useGetSeatMap";

export type TSelectedSeat = {
  seatId: string;
  seatLabel: string;
  gridRow: number;
  gridCol: number;
};

export const useSelectSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState<TSelectedSeat[]>([]);

  const toggleSeat = (seat: Seat) => {
    if (seat.isBooked || seat.type === "aisle") return;

    setSelectedSeats((prev) => {
      const isCurrentlySelected = prev.some((s) => s.seatId === seat.id);

      if (isCurrentlySelected) {
        return prev.filter((s) => s.seatId !== seat.id);
      } else {
        const newList = [
          ...prev,
          {
            seatId: seat.id,
            seatLabel: `${seat.rowLabel}${seat.seatNumber}`,
            gridRow: seat.gridRow,
            gridCol: seat.gridCol,
          },
        ];

        return newList.sort((a, b) => {
          return a.gridRow - b.gridRow || a.gridCol - b.gridCol;
        });
      }
    });
  };

  const isSelected = (seatId: string) =>
    selectedSeats.some((s) => s.seatId === seatId);

  return { selectedSeats, toggleSeat, isSelected };
};
