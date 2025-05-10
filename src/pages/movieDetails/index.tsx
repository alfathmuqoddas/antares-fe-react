import { useParams } from "react-router";
import { fetcher } from "@/lib/fetcher";
import { formatTime } from "@/utils/formatTime";
import useSWR from "swr";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/movies/${id}/showtimes`,
    fetcher
  );

  if (error) {
    console.error("Error fetching movie data:", error);
    return <p>Error: {error.message}</p>;
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
        <h1 className="font-bold mb-4">
          <span className="font-normal">Showtimes for movie</span> {title}
        </h1>
        {/* {data && <pre>Data: {JSON.stringify(data, null, 2)}</pre>} */}
        {theaters.length > 0 ? (
          <section className="flex flex-col gap-4">
            {theaters.map((theater: any) => (
              <div key={theater.id} className="p-4 bg-gray-200 rounded-xl">
                <h2 className="font-bold mb-4">{theater.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {theater.showtimes.map((showtime: any) => (
                    <div
                      key={showtime.id}
                      className="rounded-lg bg-white p-2 shadow-md hover:cursor-pointer"
                    >
                      <h3 className="text-center">
                        {formatTime(showtime.startTime)}
                      </h3>
                    </div>
                  ))}
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
