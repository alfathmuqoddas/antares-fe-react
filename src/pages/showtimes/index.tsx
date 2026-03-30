import { useParams, useLocation } from "react-router";
import { Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSeatMap } from "./hooks/useGetSeatMap";
import { useSelectSeats } from "./hooks/useSelectSeats";

export default function Showtimes() {
  const id = useParams().id as string;
  const location = useLocation();
  const { movie, screenId } = location.state;
  const { seats, loading, maxRow, maxCol } = useGetSeatMap(screenId, id);
  const { selectedSeatIds, toggleSeat, isSelected } = useSelectSeats();

  return (
    <div>
      <div className="flex-1 overflow-auto p-8">
        <div className="flex flex-col items-center min-w-max">
          <div className="w-1/2 h-2 bg-slate-300 rounded-full mb-12 shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-center text-[10px] text-slate-500 uppercase tracking-widest">
            Screen
          </div>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateRows: `repeat(${maxRow + 1}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${maxCol + 1}, minmax(0, 1fr))`,
              width: "fit-content",
            }}
          >
            {seats?.map((seat) => {
              const seatsInThisRow = seats.filter(
                (s) => s.gridRow === seat.gridRow,
              );
              const seatIndexInRow = seatsInThisRow.indexOf(seat);
              const earlierAvailableSeats = seatsInThisRow
                .slice(0, seatIndexInRow + 1)
                .filter((s) => s.status === "available").length;

              if (seat.type === "aisle") {
                return (
                  <div
                    key={`${seat.gridRow}-${seat.gridCol}`}
                    className="w-12 h-10"
                  />
                );
              }

              return (
                <div key={`${seat.gridRow}-${seat.gridCol}`}>
                  <Button
                    className={`${isSelected(seat.id) ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white" : ""} w-12 h-10`}
                    variant={`${seat.isBooked ? "secondary" : "outline"}`}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.type === "aisle"}
                  >
                    {seat.isBooked ? (
                      <span className="text-[10px] text-muted-foreground">
                        Booked
                      </span>
                    ) : (
                      <div className="flex flex-col items-center text-[10px]">
                        <Armchair size={12} />
                        <span>
                          {seat.rowLabel}
                          {earlierAvailableSeats}
                        </span>
                      </div>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded" /> Available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded" /> Reserved
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded" /> Selected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
