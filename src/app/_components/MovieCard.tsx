import { Movie } from "./MovieSection";

export type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="h-109.75 w-57.4325 bg-[#F4F4F5] flex flex-col rounded-lg gap-2">
      <img
        className="h-85 w-full rounded-t-lg hover:grayscale-35"
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
      ></img>
      <div className="flex flex-col mx-2">
        <div className="flex gap-2 items-center">
          <img src="./star.png" className="h-4.5 2-4"></img>
          <p className="text-xs">{movie.vote_average}</p>
        </div>
        <p className="text-base">{movie.title}</p>
      </div>
    </div>
  );
};
