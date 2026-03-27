"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MovieGenre = {
  id: number;
  name: string;
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFmYmVhZGExOGMxNTUzM2E2MDQ0OWZlOTA1NWE2YiIsIm5iZiI6MTc2MzUyMzMwNC4zMTQsInN1YiI6IjY5MWQzYWU4ZTdkOTBmYjA0MGZjMWQyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3XN8YvwLBISzrh3ZLkaoNFCrHhUO1LPaVAYjq_oDsE";

type GenreListProps = {
  className?: string;
  listClassName?: string;
  showSelectionSummary?: boolean;
};

export const GenreList = ({
  className,
  listClassName,
  showSelectionSummary = false,
}: GenreListProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedGenreIds = useMemo(
    () => searchParams.get("genreIds")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );

  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const selectedGenreIdSet = useMemo(
    () => new Set(selectedGenreIds),
    [selectedGenreIds]
  );

  const sortedGenres = useMemo(() => {
    return [...genres].sort((a, b) => {
      const aSelected = selectedGenreIdSet.has(String(a.id));
      const bSelected = selectedGenreIdSet.has(String(b.id));

      if (aSelected !== bSelected) {
        return aSelected ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });
  }, [genres, selectedGenreIdSet]);

  const selectedGenreNames = useMemo(() => {
    return genres
      .filter((genre) => selectedGenreIdSet.has(String(genre.id)))
      .map((genre) => genre.name);
  }, [genres, selectedGenreIdSet]);

  const pushWithParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `/genres?${query}` : "/genres");
  };

  const handleClickGenre = (genreId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    const idStr = String(genreId);
    let updated = [...selectedGenreIds];

    if (updated.includes(idStr)) {
      updated = updated.filter((id) => id !== idStr);
    } else {
      updated.push(idStr);
    }

    if (updated.length) {
      params.set("genreIds", updated.join(","));
    } else {
      params.delete("genreIds");
    }

    pushWithParams(params);
  };

  const handleClearGenres = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("genreIds");
    pushWithParams(params);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            accept: "application/json",
            Authorization: TOKEN,
          },
        }
      );

      const data = await res.json();
      setGenres(data.genres || []);
    };

    fetchData();
  }, []);

  return (
    <div className={cn("space-y-3", className)}>
      {showSelectionSummary && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          {selectedGenreNames.length > 0
            ? `Selected: ${selectedGenreNames.join(", ")}`
            : "No genre selected yet"}
        </div>
      )}

      <div className={cn("flex flex-wrap gap-2 max-w-md", listClassName)}>
        {selectedGenreIds.length > 0 && (
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full px-3 py-1 text-xs"
            onClick={handleClearGenres}
          >
            Clear all
          </Button>
        )}

        {sortedGenres.map((genre) => {
          const isActive = selectedGenreIdSet.has(String(genre.id));

          return (
            <Button
              key={genre.id}
              size="sm"
              variant={isActive ? "default" : "outline"}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1 text-xs",
                isActive && "border-primary shadow-sm"
              )}
              onClick={() => handleClickGenre(genre.id)}
            >
              {genre.name}
              <ChevronRight className="w-3 h-3" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
