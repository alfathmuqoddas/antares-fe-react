import { useState } from "react";
import { Armchair } from "lucide-react";

const SeatPicker = () => {
  // Initial data structure based on your 10x12 request
  const initialRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // Initialize state with your column 6 & 7 "unavailable" constraint
  const [seats, setSeats] = useState(() => {
    return initialRows.map((row) => ({
      row,
      row_seats: columns.map((col) => ({
        id: `${row}${col}`,
        status:
          col === 6 || col === 7
            ? "unavailable"
            : Math.random() > 0.8
              ? "reserved"
              : "available",
        selected: false,
      })),
    }));
  });

  const toggleSeat = (rowIdx: any, colIdx: any) => {
    const newSeats = [...seats];
    const seat = newSeats[rowIdx].row_seats[colIdx];

    if (seat.status === "available") {
      seat.selected = !seat.selected;
      setSeats(newSeats);
    }
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center">
      <div className="mb-16 w-full max-w-md bg-gray-700 h-2 rounded-t-full shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
        <p className="text-center text-xs mt-4 text-gray-400">SCREEN</p>
      </div>

      <div className="grid gap-4">
        {seats.map((row, rowIdx) => (
          <div key={row.row} className="flex gap-2 items-center">
            <span className="w-6 text-gray-500 font-bold">{row.row}</span>
            <div className="flex gap-2">
              {row.row_seats.map((seat, colIdx) => (
                <button
                  key={seat.id}
                  disabled={seat.status !== "available"}
                  onClick={() => toggleSeat(rowIdx, colIdx)}
                  className={`
                    w-8 h-8 rounded-md flex items-center justify-center transition-all
                    ${seat.status === "unavailable" ? "opacity-0 cursor-default" : ""}
                    ${seat.status === "reserved" ? "bg-gray-600 cursor-not-allowed" : ""}
                    ${seat.status === "available" && !seat.selected ? "bg-emerald-500 hover:bg-emerald-400" : ""}
                    ${seat.selected ? "bg-blue-500 ring-2 ring-white scale-110" : ""}
                  `}
                >
                  {seat.status !== "unavailable" && <Armchair size={16} />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
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
  );
};

export default SeatPicker;
