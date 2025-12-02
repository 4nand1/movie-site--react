"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import ReactPlayer from "react-player";

// ---------------- Төрлүүд ----------------
type HeroMovie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
};

type TMDBResponse = {
  results: HeroMovie[];
};

type VideoItem = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

// ---------------- Тогтмол ----------------
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

// яг нэг мөр дээр байг, өмнөх алдаа чинь эндээс болсон
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k";

// ---------------- Компонент ----------------
export const HeroSection = () => {
  const [movies, setMovies] = useState<HeroMovie[]>([]);

  // trailer modal–д хэрэгтэй state-ууд
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);

  // ---------------- Now playing кино татах ----------------
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        const data: TMDBResponse = await res.json();
        // эхний 5 кино hero дээр
        setMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error("Hero fetch error:", error);
      }
    };

    getData();
  }, []);

  // ---------------- Trailer татах функц ----------------
  const handleWatchTrailer = async (movieId: number) => {
    setTrailerOpen(true);
    setTrailerLoading(true);
    setTrailerKey(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: TOKEN,
          },
        }
      );

      const data = await res.json();
      const videos: VideoItem[] = data.results || [];

      // 1. Trailer
      let trailer =
        videos.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        ) ||
        // 2. Trailer байхгүй бол Teaser
        videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
        // 3. Бас байхгүй бол эхний YouTube video
        videos.find((v) => v.site === "YouTube");

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer not found for this movie 😢");
        setTrailerOpen(false);
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
      alert("Failed to load trailer");
      setTrailerOpen(false);
    } finally {
      setTrailerLoading(false);
    }
  };

  const handleCloseTrailer = () => {
    setTrailerOpen(false);
    setTrailerKey(null);
  };

  if (!movies.length) return null;

  return (
    <>
      {/* --------- HERO CAROUSEL --------- */}
      <section className="px-10 pt-6">
        <Carousel className="w-full">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="relative w-full h-[820px] rounded-xl overflow-hidden">
                  <img
                    src={`${IMAGE_BASE}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/0" />

                  <div className="relative z-10 flex h-full items-center px-10">
                    <div className="max-w-md text-white">
                      <p className="text-sm opacity-80 mb-1">Now Playing</p>

                      <h1 className="text-4xl font-bold mb-3">
                        {movie.title}
                      </h1>

                      <div className="flex items-center gap-2 text-sm mb-4">
                        <div className="flex">
                          <img
                            src="/Vector (3).png"
                            className="w-5 h-5 inline-block mr-1"
                          />
                          <span>{movie.vote_average.toFixed(1)} / 10</span>
                        </div>
                      </div>

                      <p className="text-xs leading-5 opacity-90 mb-6 line-clamp-3">
                        {movie.overview}
                      </p>

                      <div className="flex gap-3">
                        {/* Trailer үзэх */}
                        <Button
                          variant="outline"
                          className="bg-white dark:bg-white text-black text-sm font-medium px-5 py-2 rounded-full"
                          onClick={() => handleWatchTrailer(movie.id)}
                          disabled={trailerLoading}
                        >
                          {trailerLoading ? "Loading..." : "Watch Trailer"}
                        </Button>

                        {/* Хэрвээ хүсвэл details page рүү орох товчоо үлдээж болно */}
                        <Link href={`/movie/${movie.id}`}>
                          <Button
                            variant="outline"
                            className="text-sm font-medium px-5 py-2 rounded-full bg-transparent border-white/40 text-white hover:bg-white/10"
                          >
                            See details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* --------- TRAILER MODAL --------- */}
      {trailerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-4xl aspect-video bg-black">
            <button
              onClick={handleCloseTrailer}
              className="absolute -top-10 right-0 text-sm text-white px-3 py-1"
            >
              ✕ Close
            </button>

            {trailerLoading || !trailerKey ? (
              <div className="flex h-full w-full items-center justify-center text-white text-sm">
                Loading trailer...
              </div>
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                playing
                controls
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
