import { useState } from "react";
import {
  Table,
  TableBody,
  //   TableCaption,
  TableCell,
  //   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewShowtimesModal from "./modal/newShowtimesModal";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";

const ManageShowtimes = ({
  theaterId,
  screens,
}: {
  theaterId: string;
  screens: any;
}) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/showtimes/theater/${theaterId}`,
    fetcher
  );
  if (error) {
    console.error("Error fetching theaters data:", error);
    return <p>Sorry, there was an error fetching the theaters.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data found.</p>;
  }
  const handleDeleteShowtime = async (id: string) => {
    setIsLoadingDelete(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/showtimes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      alert(data.message);
      setIsLoadingDelete(false);
    } catch (error) {
      alert("Error deleting showtime");
      setIsLoadingDelete(false);
    }
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Showtimes</h1>
        <NewShowtimesModal screens={screens} />
      </div>
      <section className="rounded-lg p-4 shadow bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Movie Name</TableHead>
              <TableHead>Screen Name</TableHead>
              <TableHead>Screen Type</TableHead>
              <TableHead>Ticket Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((showtime: any) => (
                <TableRow key={showtime.id}>
                  <TableCell>{showtime.movie.title}</TableCell>
                  <TableCell>{showtime.screen.name}</TableCell>
                  <TableCell>{showtime.screen.screenType}</TableCell>
                  <TableCell>{showtime.ticketPrice}</TableCell>
                  <TableCell>
                    {dayjs(showtime.startTime).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(showtime.startTime).format("H:mm")}
                  </TableCell>
                  <TableCell>
                    <Trash2
                      onClick={() => handleDeleteShowtime(showtime.id)}
                      className={`hover:cursor-pointer text-red-500 h-4 w-4 ${
                        isLoadingDelete && "text-gray-500"
                      }`}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="text-center">
                      <p>No showtimes found</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  );
};

export default ManageShowtimes;
