import { useParams, useLocation } from "react-router";
import { Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSeatMap } from "./hooks/useGetSeatMap";
import { useSelectSeats } from "./hooks/useSelectSeats";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/store/useAuth";
import { useSubmitSeats } from "./hooks/useSubmitSeats";
import TheaterMovieCard from "@/components/ui/theaterMovieCard";

export default function Showtimes() {
  const showtimeId = useParams().id as string;
  const location = useLocation();
  const user = useAuth((state) => state.user);
  const { movie, showtime } = location.state;
  const {
    seats,
    loading: loadingSeats,
    maxRow,
    maxCol,
  } = useGetSeatMap(showtime.screenId, showtimeId);
  const { selectedSeats, toggleSeat, isSelected } = useSelectSeats();
  const { submitSeats, isSubmitting } = useSubmitSeats();

  return (
    <div>
      <div className="flex-1 overflow-auto pt-4">
        <div className="flex flex-col items-center min-w-max gap-8">
          <TheaterMovieCard movie={movie} />
          <div className="w-full max-w-xl h-2 bg-slate-300 rounded-full mt-4 shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-center text-[10px] text-slate-500 uppercase tracking-widest">
            Screen
          </div>
          <p>{showtime.screenType}</p>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateRows: `repeat(${maxRow + 1}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${maxCol + 1}, minmax(0, 1fr))`,
              width: "fit-content",
            }}
          >
            {loadingSeats ? (
              <>Loading...</>
            ) : (
              seats?.map((seat) => {
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
                      className={`${isSelected(seat.id) ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white" : ""} w-12 h-10 cursor-pointer`}
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
                            {seat.seatNumber}
                          </span>
                        </div>
                      )}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded" /> Available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded" /> Reserved
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-600 rounded" /> Selected
            </div>
          </div>

          {/* booking seats component */}
          {selectedSeats.length > 0 && (
            <div className="bg-white shadow rounded-xl py-4 px-6 text-sm mb-8">
              {/* Seats Row - Force right align */}
              <div className="flex items-center justify-between mb-3 gap-12">
                <p className="font-medium">Seats</p>

                <div className="flex justify-end">
                  {" "}
                  {/* ← This is the key */}
                  <div className="grid grid-cols-6 gap-0.5">
                    {selectedSeats.map((s) => (
                      <Badge key={s.seatId}>{s.seatLabel}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Total Price</p>
                <div className="font-semibold">
                  Rp.{" "}
                  {(selectedSeats.length * showtime.ticketPrice).toLocaleString(
                    "id-ID",
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() =>
                    submitSeats(
                      selectedSeats,
                      showtimeId,
                      user?.additionalInfo.userId ?? "",
                    )
                  }
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Seats"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
