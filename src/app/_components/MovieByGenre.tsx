"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Movie } from "./MovieSection";
import { MovieCard } from "./MovieCard";

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type Props = {
  page: number;
  onTotalPages?: (total: number) => void;
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFmYmVhZGExOGMxNTUzM2E2MDQ0OWZlOTA1NWE2YiIsIm5iZiI6MTc2MzUyMzMwNC4zMTQsInN1YiI6IjY5MWQzYWU4ZTdkOTBmYjA0MGZjMWQyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3XN8YvwLBISzrh3ZLkaoNFCrHhUO1LPaVAYjq_oDsE";

export const MovieByGenre = ({ page, onTotalPages }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();

  const genreIds = searchParams.get("genreIds")?.split(",") || [];

  useEffect(() => {
    const fetchData = async () => {
      if (!genreIds.length) {
        setMovies([]);
        onTotalPages?.(1);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds.join(
            ","
          )}&page=${page}`,
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        const data: Response = await res.json();
        setMovies(data.results || []);
        onTotalPages?.(data.total_pages || 1);
      } catch (error) {
        console.error(error);
        setMovies([]);
        onTotalPages?.(1);
      }
    };

    fetchData();
  }, [genreIds.join(","), page]);

  if (!genreIds.length) {
    return (
      <p className="text-sm text-zinc-500">
        Choose one or more genres from the right.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
