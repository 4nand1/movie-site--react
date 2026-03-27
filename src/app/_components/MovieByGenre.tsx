"use client";

import { useEffect, useState } from "react";
import { Movie } from "./MovieSection";
import { MovieCard } from "./MovieCard";
import { useCurrentUrl } from "./useCurrentUrl";

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
  const [loading, setLoading] = useState(false);
  const { searchParams } = useCurrentUrl();

  const genreIds = searchParams.get("genreIds")?.split(",").filter(Boolean) || [];
  const genreIdsKey = genreIds.join(",");
  const sortBy = searchParams.get("sortBy") ?? "popularity.desc";
  const voteGte = searchParams.get("voteGte") ?? "0";

  useEffect(() => {
    const fetchData = async () => {
      if (!genreIdsKey) {
        setMovies([]);
        onTotalPages?.(1);
        return;
      }

      try {
        setLoading(true);
        const params = new URLSearchParams({
          language: "en",
          with_genres: genreIdsKey,
          page: String(page),
          sort_by: sortBy,
        });

        if (Number(voteGte) > 0) {
          params.set("vote_average.gte", voteGte);
        }

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreIdsKey, page, sortBy, voteGte, onTotalPages]);

  if (!genreIdsKey) {
    return (
      <p className="text-sm text-zinc-500">
        Choose one or more genres from the right.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm"
          >
            <div className="aspect-[2/3] animate-pulse bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2 p-3">
              <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
        No movies matched the selected genre filters.
      </div>
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
