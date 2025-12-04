
import SeeMoreButton from "./_components/SeeMoreButton";

import { MovieSection } from "./_components/MovieSection";
import { HeroSection } from "./_components/HeroSection";


export default function Home() {
  return (
    <main className="min-h-screen   ">
      

      <HeroSection />

      <section className="px-10 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold ">Upcoming</h2>
          <SeeMoreButton href="/movies/upcoming" />
        </div>
        <MovieSection category="upcoming" limit={5} />
      </section>

      <section className="px-10 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold ">Popular</h2>
          <SeeMoreButton href="/movies/popular" />
        </div>
        <MovieSection category="popular" limit={5} />
      </section>

      <section className="px-10 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold ">Top Rated</h2>
          <SeeMoreButton href="/movies/top_rated" />
        </div>
        <MovieSection category="top_rated" limit={5} />
      </section>

      <section>
       
      </section>
    </main>
  );
}
