import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApi } from "@/hooks/useApi";

export type TShowtimeDto = {
  startTime: string;
  ticketPrice: number;
  screenId: string;
  movieId: string;
};

export type TShowtimeResponseDto = {
  message: string;
};

const NewShowtimesModal = ({ screens }: { screens: any }) => {
  const [open, setOpen] = useState(false);
  const [showtimeForm, setShowtimeForm] = useState({
    movieId: "",
    startTime: "",
    ticketPrice: 0,
    screenId: "",
  });
  const {
    data: moviesData,
    error: moviesError,
    isLoading: moviesLoading,
  } = useApi(`/movies/now-playing`);

  const { trigger, isMutating } = useApiMutation<
    TShowtimeResponseDto,
    any,
    TShowtimeDto
  >("/showtimes", {
    method: "POST",
    onSuccess: (data) => {
      alert(data.message);
      setOpen(false);
    },
    onError: (err) => {
      console.error("Showtime data error:", err);
      alert("Error submitting showtime");
    },
  });

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await trigger({
      ...showtimeForm,
      startTime: dayjs.tz(showtimeForm.startTime, "Asia/Jakarta").toISOString(),
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus /> New Showtimes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Showtimes</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieId">Movie</Label>
            <Select
              onValueChange={(value) =>
                setShowtimeForm({
                  ...showtimeForm,
                  movieId: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a movie" />
              </SelectTrigger>
              <SelectContent>
                {moviesLoading && (
                  <SelectItem value="loading">Loading...</SelectItem>
                )}
                {moviesError && <SelectItem value="error">Error</SelectItem>}
                {moviesData &&
                  moviesData.map((movie: any) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="datetime-local"
              placeholder="Start Time"
              onChange={(e) =>
                setShowtimeForm({
                  ...showtimeForm,
                  startTime: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ticketPrice">Ticket Price</Label>
            <Input
              id="ticketPrice"
              type="number"
              placeholder="Ticket Price"
              onChange={(e) =>
                setShowtimeForm({
                  ...showtimeForm,
                  ticketPrice: Number(e.target.value),
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="screenId">Screen</Label>
            <Select
              onValueChange={(value) =>
                setShowtimeForm({
                  ...showtimeForm,
                  screenId: value,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a screen" />
              </SelectTrigger>
              <SelectContent>
                {screens.map((screen: any) => (
                  <SelectItem key={screen.id} value={screen.id}>
                    {screen.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isMutating ? "Processing..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewShowtimesModal;
