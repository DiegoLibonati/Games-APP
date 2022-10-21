import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Footer,
  NavBar,
  Loader,
  Pagination,
} from "../../ui/components/exports";
import queryString from "query-string";
import { useGamesStore, useUiStore, usePagination } from "../../hooks/exports";
import { startGettingGamesByCategory } from "../../store/games/exports";
import { useDispatch } from "react-redux";
import { OptionFilter, CardGameInGames } from "../components/games/exports";
import "./GamesPage.css";

export const GamesPage = () => {
  const dispatch = useDispatch();
  const { allGames, allCategoriesOfApi } = useGamesStore();
  const { isCategoryFilterOpen, handleCategoryFilter } = useUiStore();

  const { allGamesArray, isAllGamesArrayLoading } = allGames;

  const {
    renderPageNumbers,
    currentItems,
    pageDecrementBtn,
    pageIncrementBtn,
    handleNextPage,
    handlePrevPage,
    currentPage,
    pages,
  } = usePagination(allGamesArray, 8);

  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  useEffect(() => {
    dispatch(startGettingGamesByCategory(q));
    // eslint-disable-next-line
  }, [q]);

  const handleFilter = (value) => {
    navigate(`?q=${value}`);
  };

  return (
    <>
      <NavBar></NavBar>

      <main className="main_games_section_container_grid">
        <section className="main_games_section_container_grid_options">
          <h2>Filters</h2>
          <OptionFilter
            headerFunctionManage={handleCategoryFilter}
            filterName="Categories"
            isFilterOpen={isCategoryFilterOpen}
            optionsArray={allCategoriesOfApi}
            filter={handleFilter}
          ></OptionFilter>
        </section>

        {isAllGamesArrayLoading ? (
          <Loader></Loader>
        ) : currentItems.length !== 0 ? (
          <section className="main_games_section_container_grid_games">
            <div className="main_games_section_container_grid_games_title">
              <h2>Games</h2>
            </div>
            {currentItems.map((game) => (
              <CardGameInGames
                key={game.id}
                {...game}
                game={game}
              ></CardGameInGames>
            ))}
            <Pagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              renderPageNumbers={renderPageNumbers}
              pageDecrementBtn={pageDecrementBtn}
              pageIncrementBtn={pageIncrementBtn}
              currentPage={currentPage}
              pages={pages}
            ></Pagination>
          </section>
        ) : (
          <section className="main_games_section_container_withoutgames">
            <h1>¡That category does not exists!</h1>
          </section>
        )}
      </main>

      <Footer></Footer>
    </>
  );
};
