import Link from "next/link";
import { topRated } from "../_components/topRated";
import { Footer } from "../_components/Footer"

export default function topPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#09090B]">
          Top Rated movies
        </h1>

        <Link href="/" className="text-xs text-gray-500 hover:underline">
          ← Back to home
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {topRated.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
          >
            <div className="h-56 bg-gray-300">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-[11px] text-gray-500 mb-1">
                ⭐ {item.rating} / 10
              </p>
              <p className="text-sm font-medium text-[#09090B]">
                {item.title}
              </p>
            </div>
          </div>
          
        ))}
      </div>
    </main>
  
  );
}
