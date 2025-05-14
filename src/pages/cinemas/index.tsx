import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useNavigate } from "react-router";

const CinemasPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/theaters`,
    fetcher
  );
  if (error) {
    console.error("Error fetching theaters data:", error);
    return <p>Sorry, there was an error fetching the theaters.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data found.</p>;
  }
  return (
    <>
      <section aria-label="cinema-page">
        <h1 className="text-xl font-bold mb-4">Cinemas</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((theater: any) => (
            <div
              key={theater.id}
              className="p-4 bg-gray-200 rounded-xl mb-4 hover:cursor-pointer"
              onClick={() => navigate(`${theater.id}`)}
            >
              <h2 className="font-bold">{theater.name}</h2>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};

export default CinemasPage;
