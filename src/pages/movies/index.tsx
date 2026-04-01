import { useNavigate } from "react-router";
import { useApi } from "@/hooks/useApi";
import type { TMovieDto } from "../admin/movies/modal/updateMovieModal";

const MoviesPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useApi<
    Array<TMovieDto & { slug: string }>
  >("/movies/now-playing");

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
        <h1 className="text-3xl font-black tracking-widest text-neutral-700 mb-8">
          MOVIES AT ANTARES
        </h1>

        {/* {data && <pre>Data: {JSON.stringify(data, null, 2)}</pre>} */}
        {/* grid of movies card with 4 columns down to 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
          {data?.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.slug}`)}
              className="rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-200 hover:cursor-pointer"
            >
              <img
                src={movie.poster}
                className="w-full rounded-b-3xl"
                alt={`poster for ${movie.title}`}
                width={300}
                height={445}
              />
              <div className="flex flex-col p-2 text-center">
                <h2 className="font-semibold text-xl uppercase">
                  {movie.title}
                </h2>
                <div className="flex justify-center gap-2 text-sm">
                  <div className="flex gap-2 items-center">
                    {movie.runtime} • {movie.rated}
                  </div>
                </div>
                <p className="text-sm">Released {movie.released}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MoviesPage;
