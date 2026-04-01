import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewShowtimesModal from "./modal/newShowtimesModal";
import { Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useApi } from "@/hooks/useApi";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useState } from "react";

const ManageShowtimes = ({
  theaterId,
  screens,
}: {
  theaterId: string;
  screens: any;
}) => {
  const [filter, setFilter] = useState({
    screenId: "",
    minDate: "",
    maxDate: "",
  });

  const { data, error, isLoading, mutate } = useApi<{
    showtimes: any;
    hasMore: boolean;
  }>(`/showtimes/admin/${theaterId}`, {
    useAuth: true,
    params: filter,
  });
  const { trigger, isMutating } = useApiMutation<any, any, any>("/showtimes", {
    method: "DELETE",
    onSuccess: (data) => {
      alert(data.message);
      mutate();
    },
    onError: (err) => {
      console.error("Screen data error:", err);
      alert("Error deleting screen");
    },
  });

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
    if (!window.confirm("Are you sure you want to delete this showtime?")) {
      return;
    }
    await trigger(`/showtimes/${id}`);
  };
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Showtimes</h1>
        <NewShowtimesModal screens={screens} />
      </div>
      <div className="flex gap-2 mb-4 max-w-xl items-center">
        <Input
          type="date"
          value={filter.minDate}
          onChange={(e) =>
            setFilter((f) => ({
              ...f,
              minDate: dayjs(e.target.value).format("YYYY-MM-DD"),
            }))
          }
        />
        <Input
          type="date"
          value={filter.maxDate}
          onChange={(e) =>
            setFilter((f) => ({
              ...f,
              maxDate: dayjs(e.target.value).format("YYYY-MM-DD"),
            }))
          }
        />
        <Select
          value={filter.screenId || "all"}
          onValueChange={(value) =>
            setFilter((f) => ({
              ...f,
              screenId: value === "all" ? "" : value,
            }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a screen" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Screens</SelectItem>
              {screens.map((screen: any) => (
                <SelectItem key={screen.id} value={screen.id}>
                  {screen.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
            {data.showtimes.length > 0 ? (
              data.showtimes.map((showtime: any) => (
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
                        isMutating && "text-gray-500"
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
