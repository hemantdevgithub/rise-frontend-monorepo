import { Button } from "@repo/ui";
import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxDisplayedPages = 2;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxDisplayedPages / 2)
    );
    let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

    if (startPage <= maxDisplayedPages) {
      endPage = Math.min(maxDisplayedPages, totalPages);
    }

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <li key={number}>
        <Button
          size="sm"
          onClick={() => onPageChange(number)}
          className={`${currentPage === number ? "" : ""}`}
        >
          {number}
        </Button>
      </li>
    ));
  };

  return (
    <nav className="flex items-center justify-center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mr-2`}
        size={"sm"}
      >
        <GrFormPrevious />
      </Button>
      <ul className="flex gap-2">{renderPageNumbers()}</ul>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`ml-2`}
        size={"sm"}
      >
        <MdOutlineNavigateNext />
      </Button>
    </nav>
  );
};

export default Pagination;
