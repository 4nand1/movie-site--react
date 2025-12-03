"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

export function MoviePagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = totalPages ? page < totalPages : true;

  const handlePrev = () => {
    if (canPrev) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (canNext) onPageChange(page + 1);
  };

  return (
    <div className="flex justify-end mt-8">
      <Pagination>
        <PaginationContent className="w-fit m-0 gap-2 text-xs sm:text-sm">
          <PaginationItem>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrev}
              disabled={!canPrev}
              className={!canPrev ? "opacity-40 cursor-not-allowed" : ""}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
          </PaginationItem>

          {page > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page > 1 && (
            <PaginationItem>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(page - 1)}
              >
                {page - 1}
              </Button>
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              variant="secondary"
              size="sm"
              className="border border-zinc-300"
            >
              {page}
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(page + 1)}
            >
              {page + 1}
            </Button>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {totalPages && (
            <PaginationItem>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </PaginationItem>
          )}

          <PaginationItem>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNext}
              disabled={!canNext}
              className={!canNext ? "opacity-40 cursor-not-allowed" : ""}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
