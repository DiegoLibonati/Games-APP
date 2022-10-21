import "./Pagination.css";

export const Pagination = ({
  renderPageNumbers,
  pageDecrementBtn,
  pageIncrementBtn,
  handleNextPage,
  handlePrevPage,
  currentPage,
  pages,
}) => {
  return (
    <>
      <section className="pagination_section">
        <article className="pagination_container">
          <ul className="pagination_container_list">
            <li>
              <button
                className="pagination-button"
                onClick={() => handlePrevPage()}
                disabled={currentPage === pages[0] ? true : false}
              >
                Prev
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <button
                className="pagination-button"
                onClick={() => handleNextPage()}
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
