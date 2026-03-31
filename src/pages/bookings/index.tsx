import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { IBooking } from "./type";
import BookingCard from "@/components/BookingCard";

export default function Bookings() {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE}/bookings/my-bookings`,
    fetcher,
  );
  if (error) {
    console.error("Error fetching bookings data:", error);
    return <p>Sorry, there was an error fetching the bookings data.</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No data found.</p>;
  }

  const bookings: IBooking[] = data;

  return (
    <div>
      <h1 className="text-3xl font-black mb-8 tracking-widest text-neutral-700">
        MY BOOKINGS
      </h1>
      <section>
        <div className="flex flex-col gap-4 md:gap-4">
          {bookings.map((booking: IBooking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </section>
    </div>
  );
}
