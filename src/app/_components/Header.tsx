"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Default } from "./Default";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type Genre = {
  id: number;
  name: string;
};

type SearchSuggestion = {
  id: number;
  title: string;
  poster_path: string | null;
};

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k";

export const Header = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const { theme, setTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter(); 

  const handleSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;
    setShowSuggestions(false);
    router.push(`/search?query=${encodeURIComponent(q)}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        const data = await res.json();
        setSuggestions((data.results || []).slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSuggestionClick = (movieId: number, title: string) => {
    setSearchTerm(title);
    setShowSuggestions(false);
    router.push(`/search?query=${encodeURIComponent(title)}`);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: TOKEN,
            },
          }
        );

        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const genreList = Array.isArray(genres) ? genres : [];

  return (
    <header className="h-[64px] flex items-center justify-between px-10 border-b border-gray-200">
      <Link href="/">
        <div className="flex   gap-2">
          <img src="/Vector.png" />
          <img src="/Movie Z.png" />
        </div>
      </Link>
      

      <div className="flex flex-1 items-center gap-3 max-w-[600px] mx-8">
        <NavigationMenu className="w-25 h-9  rounded-md border ">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
              Genres
            </NavigationMenuTrigger>
            <NavigationMenuContent className="pl- border border-[#E4E4E7] rounded-lg w-[557px] h-[333px]">
              <div className="flex flex-col gap-3">
                <p className="text-[24px]  leading-6 font-semibold font-sans">
                  Genres
                </p>
                <p className="text-[16px] ] leading-6 font-normal font-sans">
                  See lists of movies by genre
                </p>
              </div>
              <div className="w-[537px] h-[15px] border-b border-[#E4E4E7] "></div>

              <div className="w-[527px] flex flex-wrap gap-4 mt-5">
                {genreList.map((item, index) => (
                  <Link
                    key={index}
                    href={`/genres/${item.id}?genreIds=${item.id}`}
                    className="no-underline"
                  >
                    <Default name={item.name} />
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>

        <div className="flex-1 relative">
          <div className="flex items-center gap-2 border rounded px-2 py-1">
            <Search className="cursor-pointer" onClick={handleSearch} />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full text-sm border-white"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-200 rounded-lg shadow-lg z-50">
              {suggestions.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleSuggestionClick(movie.id, movie.title)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-left border-b last:border-b-0"
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}
                      alt={movie.title}
                      className="w-8 h-12 object-cover rounded"
                    />
                  )}
                  <span className="text-sm truncate">{movie.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-8 h-8 rounded  p-0 flex items-center justify-center"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </header>
  );
};
