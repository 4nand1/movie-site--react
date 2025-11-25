"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

type MovieDetail = {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  poster_path: string;
  vote_average: number;
};
type VideoDetail = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

type Params = {
  movieid: string;
};

export default function MovieDetailPage() {
  const { movieid } = useParams<Params>();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k`,
            },
          }
        );
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k`,
            },
          }
        );

        const data = await res.json();
        const videoData = await videoRes.json();

        console.log(data);
        setMovie(data);
        setVideo(videoData?.results[0]?.key || null);
      } catch (error) {
        setError("Failed to load movie");
      }
    };

    fetchData();
  }, [movieid]);

  if (error) return <div className="p-10 text-red-600">{error}</div>;
  if (!movie) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-10 py-8 grid grid-cols-[2fr_3fr] gap-10">
      <div className="w-64">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <div className="mt-4 w-[64%] ">
          <ReactPlayer src={`https://www.youtube.com/watch?v=${video}`} />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-sm mb-2">⭐ Rating: {movie.vote_average} / 10</p>
        <p className="text-base leading-relaxed">{movie.overview}</p>
      </div>
    </div>
  );
}
