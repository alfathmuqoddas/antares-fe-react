import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Armchair } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";

type Seat = {
  gridRow: number;
  gridCol: number;
  rowLabel: string | null;
  seatNumber: number | null;
  status: string;
  type?: "seat" | "aisle";
};

const NewSeatLayoutModal = ({ screenId }: { screenId: string }) => {
  const [initialRowCol, setInitialRowCol] = useState<{
    row: number;
    col: number;
  }>({ row: 0, col: 0 });
  const [seats, setSeats] = useState<Seat[] | null>(null);

  const [open, setOpen] = useState(false);

  const { trigger, isMutating } = useApiMutation<{ message: string }, any, any>(
    `/seats/bulk`,
    {
      method: "POST",
      onSuccess: (data) => {
        alert(data.message);
        setOpen(false);
      },
      onError: (err) => {
        console.error("Seat data error:", err);
        alert("Error submitting movie");
      },
    },
  );

  const handleSetSeatBasedOnInitialRowCol = () => {
    const { row, col } = initialRowCol;
    const newSeats = [];
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        newSeats.push({
          gridRow: y,
          gridCol: x,
          rowLabel: String.fromCharCode(65 + y),
          seatNumber: null,
          status: "available",
        });
      }
    }
    setSeats(newSeats);
  };

  const toggleAisle = (row: number, col: number) => {
    setSeats((prevSeats) => {
      if (!prevSeats) return null;
      return prevSeats.map((seat) => {
        if (seat.gridRow === row && seat.gridCol === col) {
          return {
            ...seat,
            status: seat.status === "available" ? "unavailable" : "available",
          };
        }
        return seat;
      });
    });
  };

  useEffect(() => {
    setSeats(null);
  }, [open]);

  const getFinalPayload = (currentSeats: Seat[] | null) => {
    if (!currentSeats || currentSeats.length === 0) {
      return [];
    }

    const sortedSeats = [...currentSeats].sort((a, b) => {
      if (a.gridRow === b.gridRow) {
        return a.gridCol - b.gridCol;
      }
      return a.gridRow - b.gridRow;
    });

    let currentRow = -1;
    let humanCounter = 0;

    const finalized = sortedSeats.map((seat) => {
      if (seat.gridRow !== currentRow) {
        currentRow = seat.gridRow;
        humanCounter = 0;
      }

      if (seat.status === "available") {
        humanCounter++;
        return { ...seat, seatNumber: humanCounter, type: "seat" };
      }

      return { ...seat, seatNumber: null, rowLabel: null, type: "aisle" };
    });

    return finalized;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await trigger({
      seats: getFinalPayload(seats),
      screenId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>New Layout</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95vw] w-full h-[90vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Add New Seat Layout</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-2 items-center w-64 mb-4">
            <Input
              id="seatRow"
              placeholder="Set Row"
              type="number"
              min={1}
              max={26}
              onChange={(e) =>
                setInitialRowCol((prev) => ({
                  ...prev,
                  row: Number(e.target.value),
                }))
              }
            />
            <Input
              id="seatCol"
              placeholder="Set Col"
              type="number"
              min={1}
              max={40}
              onChange={(e) =>
                setInitialRowCol((prev) => ({
                  ...prev,
                  col: Number(e.target.value),
                }))
              }
            />
          </div>
          <Button
            onClick={handleSetSeatBasedOnInitialRowCol}
            className="mr-4"
            disabled={
              initialRowCol.row === 0 ||
              initialRowCol.col === 0 ||
              initialRowCol.row > 26 ||
              initialRowCol.col > 40
            }
          >
            Generate Initial Seats
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isMutating ||
              initialRowCol.row === 0 ||
              initialRowCol.col === 0 ||
              initialRowCol.row > 26 ||
              initialRowCol.col > 40
            }
          >
            {isMutating ? "Processing..." : "Submit"}
          </Button>

          <div className="flex-1 overflow-auto p-8 relative">
            <div className="flex flex-col items-center min-w-max h-[60vh]">
              <div className="w-1/2 h-2 bg-slate-300 rounded-full mb-12 shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-center text-[10px] text-slate-500 uppercase tracking-widest">
                Screen
              </div>
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${initialRowCol.col}, min-content)`,
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
                        onClick={() => toggleAisle(seat.gridRow, seat.gridCol)}
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
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSeatLayoutModal;
