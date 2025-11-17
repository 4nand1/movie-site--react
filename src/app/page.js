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
} from "@/components/ui/navigation-menu"

import { Search } from "lucide-react";

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
              <div className="flex flex-col gap-1">
              <p className="text-[24px] text-[#09090B] leading-6 font-semibold font-sans">
                Genres</p>
                <p className="text-[16px] text-[#09090B] leading-6 font-normal font-sans">
                  See lists of mivies by genre
                </p>
                </div>
                <div className="w-[537px] h-[15px] border-b border-[#E4E4E7] "></div>
                <div className="w-[527px] flex flex-wrap gap-4 mt-5">
                  {DataTransfer.map((item,index) =>  {
                    return Default key={index} name{item.name} />;
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
    </main>
  );
}
