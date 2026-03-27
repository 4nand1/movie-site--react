"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BackHome } from "./BackHome";
import { GenreList } from "./GenreList";
import { MovieByGenre } from "./MovieByGenre";
import { MoviePagination } from "./Pagination";
import { Button } from "@/components/ui/button";

const SORT_OPTIONS = [
  { label: "Popular", value: "popularity.desc" },
  { label: "Newest", value: "primary_release_date.desc" },
  { label: "Top rated", value: "vote_average.desc" },
];

const RATING_OPTIONS = [
  { label: "All ratings", value: "0" },
  { label: "6+", value: "6" },
  { label: "7+", value: "7" },
  { label: "8+", value: "8" },
];

function GenreResultsSection() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  return (
    <>
      <MovieByGenre page={page} onTotalPages={setTotalPages} />

      <div className="mt-6 flex justify-center">
        <MoviePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

type Props = {
  initialGenreId?: string;
};

export function GenresPageContent({ initialGenreId }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const syncedGenreRef = useRef<string | null>(null);

  const selectedGenreIds = useMemo(
    () => searchParams.get("genreIds")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const selectedGenreKey = selectedGenreIds.join(",");
  const sortBy = searchParams.get("sortBy") ?? "popularity.desc";
  const voteGte = searchParams.get("voteGte") ?? "0";
  const filtersKey = `${selectedGenreKey}|${sortBy}|${voteGte}`;

  const updateQueryParam = (key: string, value: string, defaultValue?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");
    params.delete("voteGte");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  useEffect(() => {
    if (!initialGenreId) return;

    const currentGenreIds = searchParams.get("genreIds");
    if (currentGenreIds) {
      syncedGenreRef.current = initialGenreId;
      return;
    }

    if (syncedGenreRef.current === initialGenreId) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("genreIds", String(initialGenreId));
    syncedGenreRef.current = initialGenreId;

    router.replace(`${pathname}?${params.toString()}`);
  }, [initialGenreId, searchParams, pathname, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-10 py-8">
        <div className="flex gap-8">
          <section className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-zinc-400">
                  Search results
                </p>
                <h1 className="text-2xl font-bold md:text-3xl">
                  Movies by genre
                </h1>
              </div>
              <BackHome />
            </div>

            <div className="mb-6 space-y-4 rounded-2xl border border-zinc-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Sort by:
                </p>
                {SORT_OPTIONS.map((option) => {
                  const isActive = sortBy === option.value;

                  return (
                    <Button
                      key={option.value}
                      type="button"
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() =>
                        updateQueryParam("sortBy", option.value, "popularity.desc")
                      }
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Rating:
                </p>
                {RATING_OPTIONS.map((option) => {
                  const isActive = voteGte === option.value;

                  return (
                    <Button
                      key={option.value}
                      type="button"
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => updateQueryParam("voteGte", option.value, "0")}
                    >
                      {option.label}
                    </Button>
                  );
                })}

                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="rounded-full"
                  onClick={clearFilters}
                >
                  Reset filters
                </Button>
              </div>

              <p className="text-sm text-zinc-500">
                {selectedGenreIds.length
                  ? `${selectedGenreIds.length} genre selected`
                  : "Choose at least one genre from the right."}
              </p>
            </div>

            <GenreResultsSection key={filtersKey} />
          </section>

          <aside className="w-64 shrink-0 rounded-lg border-l border-[#E4E4E7] px-4 py-4">
            <p className="mb-1 text-2xl font-semibold">Search by genre</p>
            <p className="mb-3 text-xs text-zinc-400">Select one or more genres</p>

            <div className="flex flex-wrap gap-2">
              <GenreList />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
