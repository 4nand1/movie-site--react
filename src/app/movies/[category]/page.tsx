"use client";

import { MovieSection } from "../../_components/MovieSection";
import { BackHome } from "../../_components/BackHome";
import { notFound, useParams } from "next/navigation";

type Params = {
  category: string;
};

const TITLE_MAP: Record<string, string> = {
  upcoming: "Upcoming Movies",
  popular: "Popular Movies",
  top_rated: "Top Rated Movies",
};

export default function CategoryPage() {
  const { category } = useParams<Params>();

  // category verifiy – буруу slug орвол 404
  if (!category || !TITLE_MAP[category]) {
    return notFound();
  }

  const title = TITLE_MAP[category];

  return (
    <main className="px-10 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <BackHome />
      </div>

      

      <MovieSection
        category={category as "upcoming" | "popular" | "top_rated"}
      />
    </main>
  );
}
