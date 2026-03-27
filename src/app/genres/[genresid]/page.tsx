"use client";

import { useParams } from "next/navigation";
import { GenresPageContent } from "../../_components/GenresPageContent";

export default function MovieGenresPage() {
  const { genresid } = useParams<{ genresid: string }>();

  return <GenresPageContent initialGenreId={genresid} />;
}
