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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const NewMovieModal = () => {
  const [query, setQuery] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  //useEffect to debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    `https://www.omdbapi.com/?i=${debouncedQuery}&apiKey=af1284eb`,
    fetcher
  );

  //submit the imdbId
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/movies/fetch-movie-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imdbId: debouncedQuery,
          }),
        }
      );
      const data = await res.json();
      setLoadingSubmit(false);
      alert(data.message);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoadingSubmit(false);
      alert("Error submitting movie");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus /> New Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Movie</DialogTitle>
          <DialogDescription>Search movie by imdbID</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-1 items-center">
            <Label htmlFor="imdbIdNewmovie" className="text-right mr-4">
              ImdbID
            </Label>
            <Input
              id="imdbIdNewmovie"
              className="col-span-3"
              placeholder="insert imdbID"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
              <div>
                <p>
                  Title: <strong>{data.Title}</strong>
                </p>
                <p>
                  Release Date: <strong>{data.Released}</strong>
                </p>
                <p>
                  Runtime: <strong>{data.Runtime}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={loadingSubmit}>
            {loadingSubmit ? "Processing..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMovieModal;
