import { Badge } from "./ui/badge";
import { IBooking } from "../pages/bookings/type";

interface BookingCardProps {
  booking: IBooking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Combine rowLabel + seatNumber → G4, G5, etc.
  const seatLabels = booking.bookingSeats.map(
    (bs) => `${bs.seat.rowLabel}${bs.seat.seatNumber}`,
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
      {/* Left Side - Poster */}
      <div className="w-full md:w-56 relative flex-shrink-0">
        <img
          src={booking.showtime.movie.poster}
          alt={booking.showtime.movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-black/80 text-white text-xs font-medium"
          >
            {booking.status}
          </Badge>
        </div>
      </div>

      {/* Right Side - Details */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold leading-tight mb-1">
            {booking.showtime.movie.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            {booking.showtime.screen.name} •{" "}
            {booking.showtime.screen.screenType} •{" "}
            {booking.showtime.screen.theater.name || "Cilincing Theater"}
          </p>

          {/* Booking Code */}
          <div className="mb-3">
            <p className="text-xs text-gray-500">BOOKING CODE</p>
            <p className="font-mono font-semibold text-emerald-600">
              {booking.bookingCode}
            </p>
          </div>

          {/* Showtime */}
          <div className="mb-3">
            <p className="text-xs text-gray-500">SHOWTIME</p>
            <p className="font-medium text-sm">
              {formatDate(booking.showtime.startTime)}
            </p>
          </div>

          {/* Seats */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1.5">SEATS</p>
            <div className="flex flex-wrap gap-2">
              {seatLabels.map((seat, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-sm font-medium px-3 py-0.5"
                >
                  {seat}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Footer */}
        <div className="pt-4 border-t flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">TOTAL</p>
            <p className="text-2xl font-bold text-gray-900">
              Rp. {parseInt(booking.totalPrice).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="text-right text-xs text-gray-500">
            Booked on {new Date(booking.createdAt).toLocaleDateString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  );
}
