import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useNavigate } from "react-router";

const MoviesPage = () => {
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_API_BASE);
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/movies/now-playing`,
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
      <section className="" aria-label="movies-page">
        <h1 className="text-xl font-bold mb-4">Movies at Antares</h1>
        {/* {data && <pre>Data: {JSON.stringify(data, null, 2)}</pre>} */}
        {/* grid of movies card with 4 columns down to 2 columns on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.map((movie: any) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="rounded-3xl overflow-hidden group hover:bg-red-500 hover:scale-105 transition-all duration-200 hover:cursor-pointer"
            >
              <img
                src={movie.poster}
                alt={`poster for ${movie.title}`}
                width={300}
                height={445}
              />
              <div className="flex flex-col pt-2 pb-4 text-center">
                <h2 className="font-semibold text-center group-hover:text-white">
                  {movie.title}
                </h2>
                <div className="flex justify-center gap-4 text-sm text-gray-600 group-hover:text-white">
                  <p>{movie.runtime}</p>
                  <p>{movie.released}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MoviesPage;
