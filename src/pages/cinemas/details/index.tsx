import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useParams } from "react-router";
import TheaterMovieCard from "@/components/ui/theaterMovieCard";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const CinemaDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/theaters/${id}/showtimes`,
    fetcher
  );
  if (error) {
    console.error("Error fetching theaters data:", error);
    return (
      <p>Sorry, there was an error fetching the showtimes of this theater.</p>
    );
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data found.</p>;
  }
  return (
    <>
      <section aria-label="cinema-details-page">
        <div>
          <h1 className="text-xl font-bold mb-4">Showtimes for {data.name}</h1>
        </div>
        <section className="flex flex-col gap-4">
          {data.movies.length > 0 ? (
            data.movies?.map((movie: any) => (
              <div
                key={movie.id}
                className="rounded-lg bg-gray-50 shadow overflow-hidden"
              >
                <div>
                  <TheaterMovieCard movie={movie} />
                </div>
                <div className="flex flex-col gap-4 p-4">
                  {Object.entries(movie.screenTypes).map(
                    ([screenType, showtimes]: any) => (
                      <div key={screenType} className="flex flex-col">
                        <h2 className="font-bold mb-1">{screenType}</h2>
                        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                          {showtimes.map((showtime: any) => (
                            <Button key={showtime.id} variant={"outline"}>
                              {dayjs(showtime.startTime).format("H:mm")}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <>No showtimes availbale for this theater</>
          )}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>
      </section>
    </>
  );
};

export default CinemaDetailsPage;
