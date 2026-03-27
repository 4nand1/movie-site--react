"use client";

import { Suspense, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { GenreList } from "./GenreList";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type SearchSuggestion = {
  id: number;
  title: string;
  poster_path: string | null;
};

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k";

export const Header = () => {
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
            <NavigationMenuContent className="w-[min(640px,calc(100vw-2rem))] rounded-lg border border-[#E4E4E7] p-4">
              <div className="flex flex-col gap-3">
                <p className="text-[24px] leading-6 font-semibold font-sans">
                  Genres
                </p>
                <p className="text-[16px] leading-6 font-normal font-sans">
                  See lists of movies by genre
                </p>
              </div>
              <div className="w-full h-[1px] border-b border-[#E4E4E7] my-4"></div>

              <div className="w-full">
                <Suspense fallback={<div className="py-4 text-sm text-zinc-500">Loading genres...</div>}>
                  <GenreList
                    showSelectionSummary
                    listClassName="max-h-[320px] max-w-none overflow-y-auto pr-2"
                  />
                </Suspense>
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
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w45${movie.poster_path}`
                        : "/placeholder.svg"
                    }
                    alt={movie.title}
                    className="w-8 h-12 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
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
