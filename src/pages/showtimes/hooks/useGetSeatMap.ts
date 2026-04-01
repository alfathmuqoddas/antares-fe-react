import { useApi } from "@/hooks/useApi";

export type Seat = {
  id: string;
  gridRow: number;
  gridCol: number;
  rowLabel: string;
  seatNumber: number;
  status: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  screenId: string;
  isBooked: boolean;
};

export const useGetSeatMap = (screenId: string, showtimeId: string) => {
  const { data: seats, isLoading: loading } = useApi<Seat[]>(
    `seats/availableSeats?showtimeId=${showtimeId}&screenId=${screenId}`,
  );

  const maxRow = seats ? Math.max(...seats.map((s) => s.gridRow)) : 0;
  const maxCol = seats ? Math.max(...seats.map((s) => s.gridCol)) : 0;

  return { seats, loading, maxRow, maxCol };
};
