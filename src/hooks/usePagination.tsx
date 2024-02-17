import { useEffect, useState } from "react";
import { UsePagination } from "../entities/entities";

export const usePagination = <T,>(arr: T[] = [], ipp = 9): UsePagination<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(ipp);

  const [pageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(arr?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    setCurrentPage(1);
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }, [arr]);

  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLElement;

    setCurrentPage(Number(target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={
            currentPage === number
              ? "pagination-page pagination-page-active"
              : "pagination-page "
          }
          key={number * 154}
          id={String(number)}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: T[] = arr?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage: React.MouseEventHandler<HTMLLIElement> = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevPage: React.MouseEventHandler<HTMLLIElement> = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="pagination-button" onClick={(e) => handleNextPage(e)}>
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;

  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className="pagination-button" onClick={(e) => handlePrevPage(e)}>
        &hellip;
      </li>
    );
  }

  return {
    renderPageNumbers,
    currentItems,
    pageDecrementBtn,
    pageIncrementBtn,
    currentPage,
    pages,
    handleNextPage,
    handlePrevPage,
  };
};
