import { Fragment, useEffect } from "react";

import { NavBar } from "../../../ui/components/NavBar/NavBar";
import { Footer } from "../../../ui/components/Footer/Footer";
import { Loader } from "../../../ui/components/Loader/Loader";
import { CardFavoriteGame } from "../../components/favorite/CardFavoriteGame/CardFavoriteGame";

import { useGamesStore } from "../../../hooks/useGamesStore";

import "./FavoritePage.css";

export const FavoritePage = (): JSX.Element => {
  const {
    favoritesGames,
    isLoadingFavoritesGames,
    handleGetFavoriteGames,
    handleSetToInitialState,
  } = useGamesStore();

  const onInit = () => {
    handleGetFavoriteGames();
  };

  const onDestroy = () => {
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return () => onDestroy();
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>

      <main className="main-favorite-page">
        {isLoadingFavoritesGames ? (
          <Loader></Loader>
        ) : favoritesGames.length > 0 ? (
          <section className="favorite-games">
            {favoritesGames.map((favoriteGame) => {
              return (
                <CardFavoriteGame
                  key={`game-${favoriteGame.id}-${favoriteGame.title}`}
                  game={favoriteGame}
                ></CardFavoriteGame>
              );
            })}
          </section>
        ) : (
          <section className="favorite-games__empty">
            <h1 className="favorite-games__empty-label">
              Add a game to your favorites list
            </h1>
          </section>
        )}
      </main>

      <Footer></Footer>
    </Fragment>
  );
};
