"use client";

import { useEffect, useState } from "react";


import { BackHome } from "../../_components/BackHome";
import { MovieCard } from "../../_components/MovieCard";
import { useParams } from "next/navigation";
import { MoviePagination } from "../../_components/Pagination";

type Params = {
  movieid: string;
};

type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k";

export default function LikeThisPage() {
  const { movieid } = useParams<Params>();

  const [movies, setMovies] = useState<SimilarMovie[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!movieid) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/similar?language=en-US&page=${page}`,
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        if (!similarRes.ok) throw new Error("Failed to load similar movies");
        const similarData = await similarRes.json();

        setMovies(similarData.results || []);
        setTotalPages(similarData.total_pages || 1);

        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );
        if (movieRes.ok) {
          const movieData = await movieRes.json();
          setTitle(movieData.title || "");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load similar movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieid, page]);

  return (
    <div className="flex flex-col min-h-screen">
      

      <main className="flex-1 flex justify-center px-10 py-8">
        <div className="w-[1080px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">More like this</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Movies similar to{" "}
                <span className="font-semibold">{title || "this title"}</span>
              </p>
            </div>
            <BackHome />
          </div>

          {loading && <p className="text-sm text-[#6B7280] mt-4">Loading...</p>}

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <MoviePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </main>

      
    </div>
  );
}
