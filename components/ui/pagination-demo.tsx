"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { usePathname } from "next/navigation";

export default function PaginationDemo({ perPage = 5, currentPage = 1, totalPages = 1 }: { perPage?: number, currentPage?:number, totalPages?: number }) {
  const pathName = usePathname();
  totalPages = Math.ceil(totalPages / perPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${pathName}?page=${currentPage > 1 ? currentPage - 1 : 1}`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`${pathName}?page=${page}`}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`${pathName}?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
