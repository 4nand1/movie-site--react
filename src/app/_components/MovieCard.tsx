"use client";

export const MovieCard = ({ movie }: any) => {
  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback.jpg"; 

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="w-full aspect-[2/3] bg-gray-200">
        <img
          src={imgSrc}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <p className="text-xs">⭐ {movie.vote_average} / 10</p>
        <p className="text-sm font-medium text-[#09090B] truncate">
          {movie.title}
        </p>
      </div>
    </div>
  );
};
