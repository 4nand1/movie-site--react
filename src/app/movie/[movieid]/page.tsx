"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";


import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BackHome } from "@/app/_components/BackHome";
import { MovieCard } from "@/app/_components/MovieCard";
import { MovieSkeleton } from "@/app/_components/MovieSkeleton";
import { Movie } from "@/app/_components/MovieSection";

type Genre = {
  id: number;
  name: string;
};

type CastMember = {
  id: number;
  name: string;
  order: number;
};

type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};

type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};

type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type MovieDetail = {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
  vote_count: number;
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

  const [credits, setCredits] = useState<Credits | null>(null);
  const [similar, setSimilar] = useState<SimilarMovie[]>([]);

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

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k`,
            },
          }
        );

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/similar?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k`,
            },
          }
        );

        const data = await res.json();
        const videoData = await videoRes.json();
        const creditsData = await creditsRes.json();
        const similarData = await similarRes.json();

        setMovie(data);
        setVideo(videoData?.results[0]?.key || null);
        setCredits(creditsData);
        setSimilar(similarData.results);
      } catch (error) {
        setError("Failed to load movie");
      }
    };

    fetchData();
  }, [movieid]);

  const director = credits?.crew?.find((p) => p.job === "Director");
  const writers = credits?.crew
    ?.filter((p) => p.department === "Writing")
    .slice(0, 3);
  const stars = credits?.cast?.slice(0, 4);

  if (error) return <div className="p-10 text-red-600">{error}</div>;
  if (!movie) return <MovieSkeleton />;

  const genres = movie.genres || [];
  const formattedVotes =
    movie.vote_count > 1000
      ? `${(movie.vote_count / 1000).toFixed(1)}k`
      : movie.vote_count.toString();

  return (
    <div className="flex flex-col items-center gap-3 min-h-screen pb-20">
      
      <div className="w-[1080px] flex-end mt-4">
        <BackHome />
      </div>
      <div className="flex flex-col items-center top-[191px] gap-6">
        <div className=" w-[1080px] flex justify-between ">
          <div className=" h-[72px] flex flex-col">
            <p className="font-extrabold text-[36px]">{movie?.title}</p>
            <div className="flex text-[18px] gap-3">
              <p>{movie?.release_date}</p>
              <p></p>
              <p>
                {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}min
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-[#6B7280]"> Rating</p>
            <div className="flex gap-2">
              <img src="/Vector (3).png" className="w-7 h-7"></img>
              <div className="flex flex-col gap-1 items-end">
                <p className="font-semibold">
                  {Math.round((movie?.vote_average || 0) / 10) * 10}/10
                </p>
                <p className="text-xs text-[6B7280]">{formattedVotes}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1080px] h-[428px] flex justify-between">
          <div className="flex justify-between gap-6">
            <img
              src={movie?.poster_path ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}` : "/placeholder.svg"}
              alt={movie?.title}
              className="w-auto h-[428px] object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            ></img>
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${video}`}
              width={760}
              height={428}
            />
          </div>
        </div>
        <div className="h-[271px] w-[1080px] gap-5 flex-col flex">
          <div className="flex flex-wrap gap-2 text-sm">
            {genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 border border-[#E4E4E7] rounded-full text-[12px] text-[#4B5563]"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="text-[14px] leading-relaxed text-[#111827]">
            {movie?.overview}
          </div>

          <div className=" flex items-center gap-10">
            <p className="text-[16px]  font-bold">Director</p>
            <p className="text-[14px] text-[#4B5563]">{director?.name}</p>
          </div>
          <div className=" flex items-center gap-10">
            <p className="text-[16px] font-bold">Writers</p>
            <p className="text-[14px] text-[#4B5563]">
              {writers?.map((w) => w.name).join(" · ")}
            </p>
          </div>
          <div className=" flex items-center gap-10">
            <p className="text-[16px] font-bold">Stars</p>
            <p className="text-[14px] text-[#4B5563]">
              {stars?.map((s) => s.name).join(" · ")}
            </p>
          </div>
        </div>

        <div className="w-[1080px] space-y-4 mb-10 gap-3">
          <div className="flex justify-between w-full">
            <p className="text-[24px] font-semibold">More like this</p>
            <Button variant="secondary" asChild>
              <Link href={`/LIkeThis/${movie.id}`}>
                {" "}
               
                See more <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {similar.slice(0, 5).map((movie: SimilarMovie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
