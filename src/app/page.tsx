import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Search } from "lucide-react";
import { Default } from "./_components/Default";
import { DataTransfer } from "./_components/genres";
import { FeatureMovies } from "./_components/poster";
import { upcomingData } from "./_components/upcomingData";
import { popularData } from "./_components/popularData";
import { topRated } from "./_components/topRated";
import SeeMoreButton from "./_components/SeeMoreButton";


export default function Home() {
  return (
    <main className="min-h-screen   bg-[#f3f4f6]">
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
                  {DataTransfer.map((item, index) => {
                    return Default({ key: index, name: item.name });
                  })}
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

      <section className="px-10 pt-6">
        <Carousel className="w-full">
          <CarouselContent>
            {FeatureMovies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="relative w-full h-[820px] rounded-xl overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/0" />

                  <div className="relative z-10 flex h-full items-center px-10">
                    <div className="max-w-md text-white">
                      <p className="text-sm opacity-80 mb-1">Now Playing</p>

                      <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

                      <div className="flex items-center gap-2 text-sm mb-4">
                        <span>⭐ {movie.rating} / 10</span>
                      </div>

                      <p className="text-xs leading-5 opacity-90 mb-6">
                        {movie.description}
                      </p>

                      <Button
                        variant="outline"
                        className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full"
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
      <section className="px-10 py-8">
        <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-[#09090B]">Upcoming</h2>
    <SeeMoreButton href="/upcoming" />
  </div>
        <div className="grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {upcomingData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="h-56 bg-gray-300">
                <img src={item.img} className="w-full h-full object-cover" />
              </div>

              <div className="p-3">
                <p className="text-[11px]  mb-1">⭐ {item.rating} / 10</p>

                <p className="text-sm font-medium text-[#09090B]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 pb-8">
        <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-[#09090B]">Popular</h2>
    <SeeMoreButton href="/popular" />
  </div>
        <div className="grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {popularData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="h-56 bg-gray-300">
                <img src={item.img} className="w-full h-full object-cover" />
              </div>

              <div className="p-3 ">
                <p className="text-[11px]  mb-1">⭐ {item.rating} / 10</p>

                <p className="text-sm font-medium text-[#09090B]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 pb-8">
        <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold text-[#09090B]">Top Rated</h2>
    <SeeMoreButton href="/top-rated" />
  </div>
        <div className="grid gap-4 grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {topRated.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="h-56 bg-gray-300">
                <img src={item.img} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-3 ">
                <p className="text-[11px]  mb-1">⭐ {item.rating} / 10</p>
                <p className="text-sm font-medium text-[#09090B]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
