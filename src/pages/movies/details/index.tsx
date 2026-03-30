import { useParams, useSearchParams, useNavigate } from "react-router";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { DateSelector } from "@/components/DateDropdown";

const MovieDetailsPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dateQuery = searchParams.get("date") || dayjs().format("DD-MM-YYYY");

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/movies/${slug}/showtimes?date=${dateQuery}`,
    fetcher,
  );

  if (error) {
    console.error("Error fetching movie data:", error);
    return <p>Sorry, there was an error fetching the movie details.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data found.</p>;
  }

  const { theaters, title } = data;

  return (
    <>
      <section className="" aria-label="showtimes for movie">
        <h1 className="font-bold mb-8">
          <span className="font-normal">Showtimes for movie</span> {title}
        </h1>
        {/* {data && <pre>Data: {JSON.stringify(data, null, 2)}</pre>} */}
        <DateSelector />
        {theaters.length > 0 ? (
          <section className="flex flex-col gap-4">
            {theaters.map((theater: any) => (
              <div
                key={theater.id}
                className="bg-gray-100 rounded-md shadow overflow-hidden"
              >
                <div className="p-4 bg-white">
                  <Link
                    to={`/cinema/${theater.slug}`}
                    className="font-bold uppercase hover:underline hover:underline-offset-4"
                  >
                    {theater.name}
                  </Link>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  {Object.entries(theater.screenTypes).map(
                    ([screenType, showtimes]: [string, any]) => {
                      return (
                        <div key={screenType}>
                          <h3 className="font-bold mb-2">{screenType}</h3>
                          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
                            {showtimes.map((showtime: any) => (
                              <Button
                                key={showtime.id}
                                variant={"outline"}
                                className="cursor-pointer"
                                onClick={() => {
                                  navigate(`/showtimes/${showtime.id}`, {
                                    state: {
                                      movie: {
                                        title: data.title,
                                        poster: data.poster,
                                        duration: data.duration,
                                        genre: data.genre,
                                        rated: data.rated,
                                      },
                                      screenId: showtime.screen.id,
                                    },
                                  });
                                }}
                              >
                                {dayjs(showtime.startTime).format("H:mm")}
                              </Button>
                            ))}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <>No available showtimes for this movie.</>
        )}
      </section>
    </>
  );
};

export default MovieDetailsPage;
