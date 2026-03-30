import { useState, useEffect } from "react";

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
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);

  const maxRow =
    seats.length > 0 ? Math.max(...seats.map((s: any) => s.gridRow)) : 0;
  const maxCol =
    seats.length > 0 ? Math.max(...seats.map((s: any) => s.gridCol)) : 0;

  useEffect(() => {
    const getSeats = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/seats/availableSeats?showtimeId=${showtimeId}&screenId=${screenId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        setSeats(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("Error submitting movie");
      } finally {
        setLoading(false);
      }
    };
    if (screenId) getSeats();
  }, [screenId]);

  return { seats, loading, maxRow, maxCol };
};
