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
import lucide from "lucide-react";

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

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const HeroSection = () => {
  const [movies, setMovies] = useState<HeroMovie[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k",
            },
          }
        );

        const data: TMDBResponse = await res.json();
        // эхний 5 кино л hero дээр эргэлдэнэ
        setMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error("Hero fetch error:", error);
      }
    };

    getData();
  }, []);

  if (!movies.length) return null; 

  return (
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

                    <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

                    <div className="flex items-center gap-2 text-sm mb-4">
                      <div className="flex">
                      <img src="/Vector (3).png" className="w-5 h-5 inline-block mr-1" />
                      <span> {movie.vote_average.toFixed(1)} / 10</span>
                      </div>
                    </div>

                    <p className="text-xs leading-5 opacity-90 mb-6 line-clamp-3">
                      {movie.overview}
                    </p>

                    <Button
                      variant="outline"
                      className="bg-white dark:bg-white text-black text-sm font-medium px-5 py-2 rounded-full"
                    >
                      Watch Trailer
                    </Button>
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
  );
};
