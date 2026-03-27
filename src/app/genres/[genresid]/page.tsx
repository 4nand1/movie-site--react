import { Suspense } from "react";

import { GenresPageContent } from "../../_components/GenresPageContent";

type PageProps = {
  params: Promise<{
    genresid: string;
  }>;
};

export default async function MovieGenresPage({ params }: PageProps) {
  const { genresid } = await params;

  return (
    <Suspense fallback={<div className="px-10 py-8">Loading genres...</div>}>
      <GenresPageContent initialGenreId={genresid} />
    </Suspense>
  );
}
