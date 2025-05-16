import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useNavigate } from "react-router";
import { MapPin, Map, Locate } from "lucide-react";

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
              className="p-4 bg-white border rounded-md mb-4 hover:cursor-pointer  hover:shadow"
              onClick={() => navigate(`${theater.id}`)}
            >
              <h2 className="font-bold mb-2">{theater.name}</h2>
              <div className="flex gap-2 items-center">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">{theater.address}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Locate className="h-4 w-4" />
                <p className="text-sm">{theater.city}</p>
                <p className="text-sm">{theater.zip}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Map className="h-4 w-4" />
                <p className="text-sm">{theater.state}</p>
              </div>
            </div>
          ))}
        </section>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </section>
    </>
  );
};

export default CinemasPage;
