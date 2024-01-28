
import React from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category: string;
  label: string;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  category,
  label
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious href={`/${label}/${category}?page=${currentPage - 1}`} />
        </PaginationItem>

        {/* Page Links */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PaginationItem key={page}>
              <Link href={`/${label}/${category}?page=${page}`} passHref>
                <PaginationLink isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </Link>
            </PaginationItem>
          )
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext href={`/${label}/${category}?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
