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

const upcomingMovies = [
  {
    id: 1,
    title: "Dear Santa",
    rating: "6.9",
    image: "/dear-santa.jpg", // дараа нь public дотор poster зургаа хийж тааруул
  },
  {
    id: 2,
    title: "How To Train Your Dragon Live Action",
    rating: "7.5",
    image: "/dragon-live.jpg",
  },
  {
    id: 3,
    title: "Alien Romulus",
    rating: "8.0",
    image: "/alien-romulus.jpg",
  },
  {
    id: 4,
    title: "From the Ashes",
    rating: "7.1",
    image: "/from-the-ashes.jpg",
  },
  {
    id: 5,
    title: "Space Dogg",
    rating: "6.8",
    image: "/space-dogg.jpg",
  },
];

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
                    See lists of mivies by genre
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
      {/* ==== UPCOMING SECTION ==== */}
      <section className="px-10 py-8">
        {/* Гарчиг мөр */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#09090B]">Upcoming</h2>
          <button className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
            See more <span>›</span>
          </button>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="flex gap-4">
            {upcomingMovies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-auto sm:basis-1/3 md:basis-1/5"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  
                  <div className="h-56 bg-gray-300">
                    
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                   
                  </div>

                  {/* Доорх текст */}
                  <div className="p-3">
                    <p className="text-[11px] text-gray-500 mb-1">
                      ⭐ {movie.rating} / 10
                    </p>
                    <p className="text-sm font-medium text-[#09090B]">
                      {movie.title}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </section>
    </main>
  );
}
