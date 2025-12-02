"use client";

import React from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;                       // одоогийн page
  totalPages?: number | null;         // TMDB-аас ирсэн нийт page (optional)
  onPageChange: (page: number) => void; // parent дээр state солих callback
};

export function MoviePagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const safeTotal = totalPages && totalPages > 0 ? totalPages : undefined;

  const canPrev = page > 1;
  const canNext = safeTotal ? page < safeTotal : true;

  const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (canPrev) onPageChange(page - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (canNext) onPageChange(page + 1);
  };

  // --- Дээрх 2-р зураг шиг 1 2 ... 5 --- //
  let pageNumbers: number[] = [];

  if (safeTotal) {
    const maxToShow = 5;
    const count = Math.min(safeTotal, maxToShow);
    for (let i = 1; i <= count; i++) pageNumbers.push(i);
  } else {
    // totalPages байхгүй үед зүгээр 1–5 харуулчихъя
    pageNumbers = [1, 2, 3, 4, 5];
  }

  return (
    <ShadcnPagination className="mt-8">
      <PaginationContent className="flex justify-center gap-1">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrev}
            className={!canPrev ? "pointer-events-none opacity-40" : ""}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {/* 1 2 3 4 5 */}
        {pageNumbers.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              href="#"
              isActive={num === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(num);
              }}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ... last */}
        {safeTotal && safeTotal > 5 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(safeTotal);
                }}
              >
                {safeTotal}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={!canNext ? "pointer-events-none opacity-40" : ""}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
