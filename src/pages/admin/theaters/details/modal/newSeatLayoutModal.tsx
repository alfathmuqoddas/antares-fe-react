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

const NewSeatLayoutModal = ({ screenId }: { screenId: string }) => {
  const [initialRowCol, setInitialRowCol] = useState<{
    row: number;
    col: number;
  }>({ row: 0, col: 0 });
  const [seats, setSeats] = useState<Array<{
    row: string;
    col: number;
    status: string;
  }> | null>(null);

  const [open, setOpen] = useState(false);

  const handleSetSeatBasedOnInitialRowCol = () => {
    const { row, col } = initialRowCol;
    const newSeats = [];
    for (let i = 1; i <= row; i++) {
      for (let j = 1; j <= col; j++) {
        newSeats.push({
          row: String.fromCharCode(64 + i),
          col: j,
          status: "available",
        });
      }
    }
    setSeats(newSeats);
  };

  const toggleAisle = (row: string, col: number) => {
    const newSeats = [...(seats || [])];
    const seat = newSeats.find((seat) => seat.row === row && seat.col === col);
    if (seat) {
      seat.status = seat.status === "available" ? "unavailable" : "available";
      setSeats(newSeats);
    }
  };

  useEffect(() => {
    setSeats(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>New Layout</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Add New Seat Layout</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-2 items-center w-64 mb-4">
            <Input
              id="seatRow"
              placeholder="Set Row"
              type="number"
              min={0}
              max={26}
              onChange={(e) =>
                setInitialRowCol({
                  row: Number(e.target.value),
                  col: initialRowCol.col,
                })
              }
            />
            <Input
              id="seatCol"
              placeholder="Set Col"
              type="number"
              min={0}
              onChange={(e) =>
                setInitialRowCol({
                  row: initialRowCol.row,
                  col: Number(e.target.value),
                })
              }
            />
          </div>
          <Button onClick={handleSetSeatBasedOnInitialRowCol}>
            Generate Initial Seats
          </Button>
          <Button onClick={() => alert(JSON.stringify(seats))}>
            Print JSON
          </Button>
          <div className="flex-1 overflow-y-auto mt-6">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${initialRowCol.col}, min-content)`,
              }}
            >
              {Array.from({ length: initialRowCol.row }).map((_, rowIndex) => {
                const rowLetter = String.fromCharCode(65 + rowIndex);
                let displayColCounter = 0;

                return seats
                  ?.filter((s) => s.row === rowLetter)
                  .map((seat) => {
                    if (seat.status === "available") {
                      displayColCounter++;
                    }

                    return (
                      <div key={`${seat.row}-${seat.col}`}>
                        <Button
                          variant={
                            seat.status === "available" ? "outline" : "ghost"
                          }
                          className={`w-12 h-10 ${seat.status === "unavailable" ? "opacity-20 border-dashed" : ""}`}
                          onClick={() => toggleAisle(seat.row, seat.col)}
                        >
                          {seat.status === "available" ? (
                            <div className="flex flex-col items-center text-[10px]">
                              <Armchair size={12} />
                              <span>
                                {seat.row}
                                {displayColCounter}
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
                  });
              })}
            </div>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewSeatLayoutModal;
