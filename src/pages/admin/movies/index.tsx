import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useNavigate, Link } from "react-router";
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
import NewMovieModal from "./modal/new";
import UpdateMovieModal from "./modal/update";

const AdminMoviesPage = () => {
  const navigate = useNavigate();
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
      <section className="" aria-label="admin-movies-page">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold">Manage Movies</h1>
          <div>
            <NewMovieModal />
          </div>
        </div>
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
                  <Link
                    to={movie.id}
                    className="hover:underline hover:underline-offset-2 font-semibold"
                  >
                    {movie.title}
                  </Link>
                </TableCell>
                <TableCell>{movie.released}</TableCell>
                <TableCell>{movie.runtime}</TableCell>
                <TableCell>{movie.nowPlaying ? "Yes" : "No"}</TableCell>
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
