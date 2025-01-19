import { Fragment, useMemo } from "react";

import { Game } from "../../../../entities/entities";

import { Loader } from "../../../../ui/components/Loader/Loader";

import { useGamesStore } from "../../../../hooks/useGamesStore";

import "./HomeCard.css";

export const HomeCard = (): JSX.Element => {
  const { games, handleSetNewGameToFavorite } = useGamesStore();

  const game = useMemo(() => {
    return games[Math.floor(Math.random() * games.length)];
  }, [games]);

  const handleSaveGameToFavorite = (game: Game): void => {
    handleSetNewGameToFavorite(game);
  };

  return (
    <article
      className={
        !game ? "home__card effect__load" : "home__card"
      }
    >
      {!game ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <img
            className="home__card-img"
            src={game.thumbnail}
            alt={game.title}
          ></img>
          <div className="home__card-information">
            <h2>{game.title}</h2>
            <h3>{game.genre}</h3>
            <h4>{game.publisher}</h4>

            <button
              type="button"
              aria-label="add to favorite"
              onClick={() => handleSaveGameToFavorite(game)}
            >
              Add to favorite
            </button>
          </div>
        </Fragment>
      )}
    </article>
  );
};
