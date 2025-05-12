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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const UpdateMovieModal = ({ movie }: { movie: any }) => {
  const [movieData, setMovieData] = useState(movie);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setIsLoadingUpdate(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/movies/${movie.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...movieData,
          }),
        }
      );
      const data = await res.json();
      setIsLoadingUpdate(false);
      alert(data.message);
    } catch (error) {
      console.error("Error updating movie:", error);
      setIsLoadingUpdate(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="underline underline-offset-2 font-semibold text-orange-400 hover:cursor-pointer">
          edit
        </span>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Movie Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieTitle">Title</Label>
            <Input
              id="movieTitle"
              value={movieData.title}
              onChange={(e) =>
                setMovieData({ ...movieData, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieNowPlaying">Now Playing</Label>
            <Select
              value={movieData.nowPlaying ? "true" : "false"}
              onValueChange={(value) =>
                setMovieData({
                  ...movieData,
                  nowPlaying: value === "true" ? true : false,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieReleased">Released</Label>
            <Input
              id="movieReleased"
              value={movieData.released}
              onChange={(e) =>
                setMovieData({ ...movieData, released: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="moviePoster">Poster</Label>
            <Input
              id="moviePoster"
              value={movieData.poster}
              onChange={(e) =>
                setMovieData({ ...movieData, poster: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieRuntime">Runtime</Label>
            <Input
              id="movieRuntime"
              value={movieData.runtime}
              onChange={(e) =>
                setMovieData({ ...movieData, runtime: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieRated">Rated</Label>
            <Input
              id="movieRated"
              value={movieData.rated}
              onChange={(e) =>
                setMovieData({ ...movieData, rated: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieDirector">Director</Label>
            <Input
              id="movieDirector"
              value={movieData.director}
              onChange={(e) =>
                setMovieData({ ...movieData, director: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="movieActors">Actors</Label>
            <Input
              id="movieActors"
              value={movieData.actors}
              onChange={(e) =>
                setMovieData({ ...movieData, actors: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="moviePlot">Plot</Label>
            <Textarea
              id="moviePlot"
              value={movieData.plot}
              onChange={(e) =>
                setMovieData({ ...movieData, plot: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpdate}
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate ? "Processing..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMovieModal;
