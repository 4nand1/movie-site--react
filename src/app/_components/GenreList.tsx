"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type MovieGenre = {
  id: number;
  name: string;
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFmYmVhZGExOGMxNTUzM2E2MDQ0OWZlOTA1NWE2YiIsIm5iZiI6MTc2MzUyMzMwNC4zMTQsInN1YiI6IjY5MWQzYWU4ZTdkOTBmYjA0MGZjMWQyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3XN8YvwLBISzrh3ZLkaoNFCrHhUO1LPaVAYjq_oDsE";

export const GenreList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

 
  const selectedGenreIds = useMemo(
    () =>
      searchParams.get("genreIds")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );

  const [genres, setGenres] = useState<MovieGenre[]>([]);

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

    router.push(`${pathname}?${params.toString()}`);
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
    <div className="flex flex-wrap gap-2 max-w-md">
      {genres.map((genre) => {
        const isActive = selectedGenreIds.includes(String(genre.id));

        return (
          <Button
            key={genre.id}
            size="sm"
            variant={isActive ? "default" : "outline"}
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
            onClick={() => handleClickGenre(genre.id)}
          >
            {genre.name}
            <ChevronRight className="w-3 h-3" />
          </Button>
        );
      })}
    </div>
  );
};
