import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const NewShowtimesModal = ({ screens }: { screens: any }) => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
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
  } = useSWR(`${import.meta.env.VITE_API_BASE}/movies/now-playing`, fetcher);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoadingSubmit(true);
    try {
      console.log({ showtimeForm });
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/showtimes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...showtimeForm,
        }),
      });
      const data = await res.json();
      setIsLoadingSubmit(false);
      alert(data.message);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setIsLoadingSubmit(false);
      alert("Error submitting movie");
    }
  };
  return (
    <Dialog>
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
            {isLoadingSubmit ? "Processing..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewShowtimesModal;
