"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { MovieCard } from "../_components/MovieCard";
import { BackHome } from "../_components/BackHome";
import { MoviePagination } from "../_components/Pagination";

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k";

type SearchResponse = {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  useEffect(() => {
    // query солигдох бүрт page-ийг 1 болгоно
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query,
        )}&language=en-US&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: TOKEN,
          },
        },
      );

      const data: SearchResponse = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages ?? undefined);
      setLoading(false);
    };

    fetchMovies();
  }, [query, page]);

  return (
    <main className="px-10 py-8 max-w-7xl mx-auto">
      <BackHome />

      <h1 className="text-3xl font-bold mb-6">
        Search results for: <span className="italic">{query}</span>
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && <p>No movies found.</p>}

      {!loading && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <MoviePagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
