"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;                       // одоогийн page
  totalPages?: number;                // хүсвэл TMDB total_pages дамжуулна
  onPageChange: (page: number) => void; // page солиход parent-д мэдэгдэнэ
};

export function MoviePagination({ page, totalPages, onPageChange }: PaginationProps) {
  const canPrev = page > 1;
  const canNext = totalPages ? page < totalPages : true;

  const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();               // href="#" → page refresh хийхгүй
    if (canPrev) onPageChange(page - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (canNext) onPageChange(page + 1);
  };

  // Энгийнээр 1–5-г харуулъя (teacher-ийнх шиг)
  const pagesToShow = [1, 2, 3, 4, 5];

  return (
    <Pagination className="mt-8">
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
        {pagesToShow.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

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
    </Pagination>
  );
}
