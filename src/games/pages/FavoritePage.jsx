import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGamesStore, usePagination } from "../../hooks/exports";
import { startLoadingFavoriteGames } from "../../store/games/exports";
import {
  Footer,
  Loader,
  NavBar,
  Pagination,
} from "../../ui/components/exports";
import { CardFavoriteGame } from "../components/favorite/exports";
import "./FavoritePage.css";

export const FavoritePage = () => {
  const dispatch = useDispatch();

  const { favoriteGames } = useGamesStore();

  const { favoriteGamesArray, isFavoriteGamesLoading } = favoriteGames;

  const {
    renderPageNumbers,
    currentItems,
    pageDecrementBtn,
    pageIncrementBtn,
    handleNextPage,
    handlePrevPage,
    currentPage,
    pages,
  } = usePagination(favoriteGamesArray, 8);

  useEffect(() => {
    dispatch(startLoadingFavoriteGames());
  }, [dispatch]);

  return (
    <>
      <NavBar></NavBar>

      <main className="main_container_favorite">
        {isFavoriteGamesLoading ? (
          <Loader></Loader>
        ) : currentItems.length !== 0 ? (
          <section className="main_container_favorite_container">
            {currentItems.map((favoriteGame) => {
              return (
                <CardFavoriteGame
                  key={favoriteGame.id}
                  {...favoriteGame}
                  favoriteGame={favoriteGame}
                ></CardFavoriteGame>
              );
            })}

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
          <section className="main_container_favorite_container_withoutgames">
            <h1>Add a game to your favorites list</h1>
          </section>
        )}
      </main>

      <Footer></Footer>
    </>
  );
};
