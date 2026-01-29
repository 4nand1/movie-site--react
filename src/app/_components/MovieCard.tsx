"use client";
import Link from "next/link";

export const MovieCard = ({ movie }: any) => {
  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className=" dark:bg-muted rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="w-full aspect-[2/3] bg-gray-200">
          <img
            src={imgSrc}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>

        <div className="p-3">
          <div className="flex items-center gap-1">
          <img src="/Vector (3).png" className="w-4 h-4 inline-block mr-1" />
          <p className="text-xs"> {movie.vote_average.toFixed(1)} / 10</p>
          </div>
          <p className="text-sm font-medium text-[#09090B] dark:text-white truncate">
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
