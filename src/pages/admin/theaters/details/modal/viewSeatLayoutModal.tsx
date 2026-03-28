import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Armchair } from "lucide-react";

type Seat = {
  gridRow: number;
  gridCol: number;
  rowLabel: string;
  seatNumber: number | null;
  status: string;
  type?: "seat" | "aisle";
};

const ViewSeatLayoutModal = ({ screenId }: { screenId: string }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);

  const maxRow =
    seats.length > 0 ? Math.max(...seats.map((s) => s.gridRow)) : 0;
  const maxCol =
    seats.length > 0 ? Math.max(...seats.map((s) => s.gridCol)) : 0;

  useEffect(() => {
    const getSeats = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/seats/byScreenId/${screenId}`,
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="underline text-blue-500 hover:cursor-pointer">
          View Layout
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95vw] w-full h-[90vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Seat Layout</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground animate-pulse">
              Loading seats...
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-8">
            <div className="flex flex-col items-center min-w-max h-[60vh]">
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

                  return (
                    <div key={`${seat.gridRow}-${seat.gridCol}`}>
                      <Button
                        variant={
                          seat.status === "available" ? "outline" : "ghost"
                        }
                        className={`w-12 h-10 ${seat.status === "unavailable" ? "opacity-20 border-dashed" : ""}`}
                      >
                        {seat.status === "available" ? (
                          <div className="flex flex-col items-center text-[10px]">
                            <Armchair size={12} />
                            <span>
                              {seat.rowLabel}
                              {earlierAvailableSeats}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">
                            Aisle
                          </span>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSeatLayoutModal;
