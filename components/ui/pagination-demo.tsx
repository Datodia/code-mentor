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
import { usePathname, useSearchParams } from "next/navigation";
import { mockBlog } from "@/app/mock-blog";

export default function PaginationDemo({ perPage = 5 }: { perPage?: number }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(mockBlog.length / perPage);

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
