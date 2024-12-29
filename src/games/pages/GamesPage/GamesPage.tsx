import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { NavBar } from "../../../ui/components/NavBar/NavBar";
import { Footer } from "../../../ui/components/Footer/Footer";
import { Loader } from "../../../ui/components/Loader/Loader";
import { CardGame } from "../../components/games/CardGame/CardGame";
import { OptionFilter } from "../../components/games/OptionFilter/OptionFilter";

import { useGamesStore } from "../../../hooks/useGamesStore";
import { useUiStore } from "../../../hooks/useUiStore";

import "./GamesPage.css";

export const GamesPage = (): JSX.Element => {
  const {
    games,
    isLoadingGames,
    categories,
    handleGetGamesByCategory,
    handleSetToInitialState,
  } = useGamesStore();
  const {
    isFilterCategoriesOpen,
    handleOpenFilterCategories,
    handleCloseFilterCategories,
  } = useUiStore();

  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const onDestroy = (): void => {
    handleSetToInitialState();
  };

  useEffect(() => {
    const category = q as string;

    handleGetGamesByCategory(category);
    // eslint-disable-next-line
  }, [q]);

  useEffect(() => {
    return () => onDestroy();
  });

  const handleClickFilter = (value: string): void => {
    navigate(`?q=${value}`);
  };

  return (
    <Fragment>
      <NavBar></NavBar>

      <main className="main_games_section_container_grid">
        <section className="main_games_section_container_grid_options">
          <h2>Filters</h2>
          <OptionFilter
            name="Categories"
            isOpen={isFilterCategoriesOpen}
            arr={categories}
            handleClickFilter={handleClickFilter}
            handleClickOpenAndClose={
              isFilterCategoriesOpen
                ? handleCloseFilterCategories
                : handleOpenFilterCategories
            }
          ></OptionFilter>
        </section>

        {isLoadingGames ? (
          <Loader></Loader>
        ) : games.length > 0 ? (
          <section className="main_games_section_container_grid_games">
            <div className="main_games_section_container_grid_games_title">
              <h2>Games</h2>
            </div>
            {games.map((game) => (
              <CardGame key={game.id} game={game}></CardGame>
            ))}
          </section>
        ) : (
          <section className="main_games_section_container_withoutgames">
            <h1>¡That category does not exists!</h1>
          </section>
        )}
      </main>

      <Footer></Footer>
    </Fragment>
  );
};
