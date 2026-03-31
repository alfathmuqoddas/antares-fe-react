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
import { Loader2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const NewMovieModal = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    debouncedQuery
      ? `https://www.omdbapi.com/?i=${debouncedQuery}&apiKey=af1284eb`
      : null,
    fetcher,
  );

  //submit the imdbId
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!data || data.Response === "False")
      return alert("No valid movie to submit");
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
        },
      );
      const data = await res.json();
      setLoadingSubmit(false);
      alert(data.message);
      setOpen(false);
      setQuery("");
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoadingSubmit(false);
      alert("Error submitting movie");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <div className="min-h-[80px] rounded-md border p-3 text-sm">
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
            {data?.Response === "False" && (
              <p className="text-destructive text-center">{data.Error}</p>
            )}
            {data?.Response === "True" && (
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
            {!debouncedQuery && (
              <p className="text-muted-foreground text-center">
                Enter an ID to preview...
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loadingSubmit || !data || data.Response === "False"}
          >
            {loadingSubmit ? "Processing..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMovieModal;
