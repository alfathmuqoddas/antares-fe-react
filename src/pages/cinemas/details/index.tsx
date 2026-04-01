import { useParams, useSearchParams, useNavigate } from "react-router";
import TheaterMovieCard from "@/components/ui/theaterMovieCard";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { DateSelector } from "@/components/DateDropdown";
import { useApi } from "@/hooks/useApi";

const CinemaDetailsPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dateQuery = searchParams.get("date") || dayjs().format("DD-MM-YYYY");
  const { data, error, isLoading } = useApi<any>(
    `/theaters/${slug}/showtimes?date=${dateQuery}`,
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
          <h1 className="mb-8">
            Showtimes for <span className="font-bold">{data.name}</span>
          </h1>
        </div>
        <DateSelector />
        <section className="flex flex-col gap-4">
          {data.movies.length > 0 ? (
            data.movies?.map((movie: any) => (
              <div
                key={movie.id}
                className="rounded-lg bg-gray-50 shadow overflow-hidden"
              >
                <TheaterMovieCard movie={movie} />
                <div className="flex flex-col gap-4 p-4">
                  {Object.entries(movie.screenTypes).map(
                    ([screenType, showtimes]: any) => (
                      <div key={screenType} className="flex flex-col">
                        <h2 className="font-bold mb-1">{screenType}</h2>
                        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                          {showtimes.map((showtime: any) => (
                            <Button
                              key={showtime.id}
                              variant={"outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                navigate(`/showtimes/${showtime.id}`, {
                                  state: {
                                    movie,
                                    showtime: {
                                      screenId: showtime.screen.id,
                                      ticketPrice: showtime.ticketPrice,
                                      screenType: showtime.screen.name,
                                    },
                                  },
                                });
                              }}
                            >
                              {dayjs(showtime.startTime).format("H:mm")}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))
          ) : (
            <>No showtimes availbale for this theater</>
          )}
        </section>
      </section>
    </>
  );
};

export default CinemaDetailsPage;
