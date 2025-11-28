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
import { DataTransfer } from "./Genres";
import { useEffect, useState } from "react";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
};

export const Header = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBmNzRkZjEzMTdhMjNkNWVmM2E3OTMzMDhhMGQ1OSIsIm5iZiI6MTc2MzUyMzU2OS45Mjk5OTk4LCJzdWIiOiI2OTFkM2JmMThjMjY4ZjAzYTYyZDQxM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fjSnRCovwF4rjUgEamZEk0VD2sMSrH4At5SU8WV6p6k",
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

  const genreList = genres.length ? genres : DataTransfer;

  return (
    <header className="h-[64px] flex items-center justify-between px-10 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <img src="/Vector.png" />
        <img src="/Movie Z.png" />
      </div>

      <div className="flex flex-1 items-center gap-3 max-w-[600px] mx-8">
        <NavigationMenu className="w-25 h-9 bg-[#FFFFFF] rounded-md   border border-[#E4E4E7]">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
              Genres
            </NavigationMenuTrigger>
            <NavigationMenuContent className="pl- border border-[#E4E4E7] rounded-lg w-[557px] h-[333px]">
              <div className="flex flex-col gap-3">
                <p className="text-[24px] text-[#09090B] leading-6 font-semibold font-sans">
                  Genres
                </p>
                <p className="text-[16px] text-[#09090B] leading-6 font-normal font-sans">
                  See lists of movies by genre
                </p>
              </div>
              <div className="w-[537px] h-[15px] border-b border-[#E4E4E7] "></div>

              <div className="w-[527px] flex flex-wrap gap-4 mt-5">
                {genreList.map((item, index) => (
                  <Link
                    key={item.id ?? index} // key-ээ энд
                    href={`/genres/${item.id}`} // 🟢 ЖАНРЫН ID-гаар линк үүсгэнэ
                    className="no-underline"
                  >
                    <Default name={item.name} /> {/* badge компонент чинь */}
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
        <div className="flex flex-1 items-center gap-2 border rounded px-2 py-1">
          <Search className="" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-full text-sm border-white"
          />
        </div>
      </div>

      <Button className="w-8 h-8 rounded bg-gray-300 p-0">
        <img src="/Vector (2).png" />
      </Button>
    </header>
  );
};
