import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewMovieModal from "./modal/newMovieModal";
import UpdateMovieModal from "./modal/updateMovieModal";
import { Badge } from "@/components/ui/badge";

const AdminMoviesPage = () => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/movies`,
    fetcher
  );
  if (error) {
    console.error("Error fetching movie data:", error);
    return <p>Sorry, there was an error fetching the movies.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data found.</p>;
  }

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Movies</h1>
        <div>
          <NewMovieModal />
        </div>
      </header>
      <section
        className="rounded-lg p-4 shadow bg-white"
        aria-label="admin-movies-page"
      >
        {/* table for movies data just title, released date and runtime */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Released</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead>Now Playing</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((movie: any) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <span className="font-semibold">{movie.title}</span>
                </TableCell>
                <TableCell>{movie.released}</TableCell>
                <TableCell>{movie.runtime}</TableCell>
                <TableCell>
                  {movie.nowPlaying ? (
                    <Badge>Yes</Badge>
                  ) : (
                    <Badge variant={"destructive"}>No</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <UpdateMovieModal movie={movie} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default AdminMoviesPage;
