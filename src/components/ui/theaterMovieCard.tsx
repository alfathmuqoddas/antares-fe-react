export interface Movie {
  id: string;
  title: string;
  poster: string;
  releaseDate: string;
  duration: string;
  genre: string;
  rated: string;
}

const TheaterMovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex gap-4 bg-white items-center p-4">
      <figure>
        <img
          src={movie.poster}
          alt={movie.title}
          width={300}
          height={445}
          className="w-16 h-auto object-cover rounded-lg"
        />
      </figure>
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl uppercase">{movie.title}</h1>
        <div className="flex items-center gap-2">
          <p>{movie.genre}</p>
          <p>{movie.duration}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>{movie.releaseDate.substr(movie.releaseDate.length - 4)}</p>
          <p>{movie.rated}</p>
        </div>
      </div>
    </div>
  );
};

export default TheaterMovieCard;
