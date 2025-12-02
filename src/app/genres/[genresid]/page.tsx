"use client";

import { useEffect, useState } from "react";
import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";
import { BackHome } from "../../_components/BackHome";
import { MovieCard } from "../../_components/MovieCard";
import { useParams } from "next/navigation";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k";

export default function MovieGenresPage() {
  // URL: /genres/[genresid]
  const { genresid } = useParams<{ genresid: string }>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🆕 баруун талын жанрын жагсаалт
  const [allGenres, setAllGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!genresid) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1) Энэ жанрын кинонууд
        const moviesRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genresid}&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        if (!moviesRes.ok) throw new Error("Failed to load movies by genre");
        const moviesData = await moviesRes.json();
        setMovies(moviesData.results || []);

        // 2) Жанрын нэр (id → name) + бүх жанрын list
        const genresRes = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        const genresData = await genresRes.json();
        const list = (genresData.genres || []) as Genre[];

        setAllGenres(list); // sidebar-д ашиглана

        const found = list.find((g) => String(g.id) === String(genresid));
        setGenre(found || null);
      } catch (e) {
        console.error(e);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genresid]);

  return (
  <div className="min-h-screen bg-background text-foreground">
  <Header />

  <main className="container mx-auto px-10 py-8">
    <div className="flex gap-8">
      {/* ЗҮҮН ТАЛ – Search results */}
      <section className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400 mb-1">
              Search results
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">
              Movies in Genre:{" "}
              {genre ? genre.name : loading ? "Loading..." : "Unknown"}
            </h1>
          </div>
          <BackHome />
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          {loading
            ? "Loading movies..."
            : `${movies.length} results for “${genre?.name ?? ""}”`}
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        {!loading && !error && (
          <>
            {/* картууд */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* доод pagination */}
            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-zinc-500">
              <button className="hover:text-zinc-900 dark:hover:text-white">
                Previous
              </button>
              <span className="px-3 py-1 rounded border border-zinc-300 text-zinc-900 dark:text-white text-sm">
                1
              </span>
              <button className="hover:text-zinc-900 dark:hover:text-white">
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* БАРУУН ТАЛ – Search by genre */}
      <aside className="w-64 shrink-0 rounded-lg px-4 py-4 border-l border-[#E4E4E7]">
        {/* ↑ энд л зураас нэмсэн */}

        <p className="text-2xl font-semibold mb-1">
          Search by genre
        </p>
        <p className="text-xs text-zinc-400 mb-3">
          See lists of movies by genre
        </p>

        <div className="flex flex-wrap gap-2">
          {allGenres.map((g) => (
            <Link
              key={g.id}
              href={`/genres/${g.id}`}
              className="text-xs px-3 py-1 rounded-full border border-[#3F3F46]
                         hover:bg-zinc-800 hover:border-zinc-500
                         transition-colors"
            >
              {g.name}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  </main>

  <Footer />
</div>
  );
}