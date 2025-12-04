"use client";

import { useEffect, useState } from "react";
import { BackHome } from "../../_components/BackHome";
import { GenreList } from "../../_components/GenreList";
import { MovieByGenre } from "../../_components/MovieByGenre";
import { MoviePagination } from "../../_components/Pagination";
import {
  useParams,
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

export default function MovieGenresPage() {
  const { genresid } = useParams<{ genresid: string }>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  useEffect(() => {
    if (!genresid) return;

    const currentGenreIds = searchParams.get("genreIds");
    if (currentGenreIds) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("genreIds", String(genresid));

    router.replace(`${pathname}?${params.toString()}`);
  }, [genresid, searchParams, pathname, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-10 py-8">
        <div className="flex gap-8">
          {/* Зүүн – search results */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
                  Search results
                </p>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Movies by genre
                </h1>
              </div>
              <BackHome />
            </div>

            <MovieByGenre page={page} onTotalPages={setTotalPages} />

            <div className="mt-6 flex justify-center">
              <MoviePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </section>

          {/* Баруун – жанр filter */}
          <aside className="w-64 shrink-0 rounded-lg px-4 py-4 border-l border-[#E4E4E7]">
            <p className="text-2xl font-semibold mb-1">Search by genre</p>
            <p className="text-xs text-zinc-400 mb-3">
              See lists of movies by genre
            </p>

            <div className="flex flex-wrap gap-2">
              <GenreList />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
