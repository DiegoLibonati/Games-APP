import { PaginationProps } from "../../entities/entities";
import "./Pagination.css";

export const Pagination = ({
  renderPageNumbers,
  pageDecrementBtn,
  pageIncrementBtn,
  currentPage,
  pages,
  handleNextPage,
  handlePrevPage,
}: PaginationProps): JSX.Element => {
  return (
    <>
      <section className="pagination_section">
        <article className="pagination_container">
          <ul className="pagination_container_list">
            <li onClick={(e) => handlePrevPage(e)}>
              <button
                className="pagination-button"
                disabled={currentPage === pages[0] ? true : false}
              >
                Prev
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li onClick={(e) => handleNextPage(e)}>
              <button
                className="pagination-button"
                disabled={
                  currentPage === pages.length || pages.length === 1
                    ? true
                    : false
                }
              >
                Next
              </button>
            </li>
          </ul>
        </article>
      </section>
    </>
  );
};
