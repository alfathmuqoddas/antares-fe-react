import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useParams } from "react-router";

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
        <h1 className="text-xl font-bold mb-4">Showtimes</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </>
  );
};

export default CinemaDetailsPage;
