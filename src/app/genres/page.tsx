import { Suspense } from "react";

import { GenresPageContent } from "../_components/GenresPageContent";

export default function GenresPage() {
  return (
    <Suspense fallback={<div className="px-10 py-8">Loading genres...</div>}>
      <GenresPageContent />
    </Suspense>
  );
}
