import { useParams, useLocation } from "react-router";
import SeatPicker from "@/components/SeatPicker";

export default function Showtimes() {
  const { id } = useParams();
  const location = useLocation();
  const movie = location.state?.movie;

  return (
    <div>
      <h1>Showtimes id {id}</h1>
      {movie && <pre>{JSON.stringify(movie, null, 2)}</pre>}
      <SeatPicker />
    </div>
  );
}
