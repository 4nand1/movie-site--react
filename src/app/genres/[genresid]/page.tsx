"use client";

import { useEffect, useState } from "react";
import { Header } from "../../_components/Header";
import { Footer } from "../../_components/Footer";
import { BackHome } from "../../_components/BackHome";
import { MovieCard } from "../../_components/MovieCard";
import { useParams } from "next/navigation";

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

        // 2) Жанрын нэр (id → name)
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
        const found = (genresData.genres as Genre[]).find(
          (g) => String(g.id) === String(genresid)
        );
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
    <div>
      <Header />
      <main className="container mx-auto px-10 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Movies in Genre:{" "}
            {genre ? genre.name : loading ? "Loading..." : "Unknown"}
          </h1>
          <BackHome />
        </div>

        {loading && <p className="text-sm text-[#6B7280]">Loading movies...</p>}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
