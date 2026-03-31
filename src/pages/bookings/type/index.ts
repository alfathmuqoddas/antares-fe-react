export interface IBooking {
  id: string;
  bookingCode: string;
  totalPrice: string;
  status: "PENDING" | "PAID" | "CANCELLED" | "EXPIRED";
  createdAt: string;
  showtime: Showtime;
  bookingSeats: BookingSeat[];
}

export interface Showtime {
  id: string;
  startTime: string;
  screen: Screen;
  movie: Movie;
}

export interface Screen {
  name: string;
  screenType: string;
  theater: Theater;
}

export interface Theater {
  name: string;
}

export interface Movie {
  title: string;
  poster: string;
}

export interface BookingSeat {
  id: string;
  seat: Seat;
}

export interface Seat {
  rowLabel: string;
  seatNumber: number;
}
