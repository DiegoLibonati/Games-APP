import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GrClose, GrFavorite } from "react-icons/gr";

import { Game } from "../../../entities/entities";

import { useGamesStore } from "../../../hooks/useGamesStore";
import { useUiStore } from "../../../hooks/useUiStore";

import "./ActiveGame.css";

export const ActiveGame = (): JSX.Element => {
  const { pathname } = useLocation();

  const {
    activeGame,
    handleClearActiveGame,
    handleSetNewGameToFavorite,
    handleDeleteFavoriteGame: handleDelFavoriteGame,
  } = useGamesStore();
  const { handleOpenAlert } = useUiStore();

  const handleDeleteFavoriteGame = (game: Game): void => {
    handleClearActiveGame();

    handleDelFavoriteGame(game);

    handleOpenAlert({
      isOpen: true,
      title: "Favorite Game",
      message: "¡Game deleted from your favorites successfully!",
      type: "success",
    });
  };

  const handleClickClose = (): void => {
    handleClearActiveGame();
  };

  const handleClickSaveNewGameToFavorite = (game: Game): void => {
    handleClearActiveGame();
    handleSetNewGameToFavorite(game);
  };

  return (
    <div className="active-game-wrapper">
      <div className="active-game">
        <div className="active-game__header">
          <img
            src={activeGame!.thumbnail}
            alt={activeGame!.title}
            className="active-game__img"
          ></img>

          <h2 className="active-game__title">{activeGame!.title}</h2>
        </div>

        <p className="active-game__description">
          {activeGame!.short_description}
        </p>

        <div className="active-game__specs">
          <h3 className="active-game__genre">
            Gender:{" "}
            <span className="active-game__genre-span">{activeGame!.genre}</span>
          </h3>
          <h3 className="active-game__platform">
            Platform:{" "}
            <span className="active-game__platform-span">
              {activeGame!.platform}
            </span>
          </h3>
          <h3 className="active-game__publisher">
            Published by:{" "}
            <span className="active-game__publisher-span">
              {activeGame!.publisher}
            </span>
          </h3>
          <h3 className="active-game__developer">
            Developed by:{" "}
            <span className="active-game__developer-span">
              {activeGame!.developer}
            </span>
          </h3>
          <h3 className="active-game__release-date">
            Release date:{" "}
            <span className="active-game__release-date-span">
              {activeGame!.release_date}
            </span>
          </h3>

          <div className="active-game__links">
            <a
              href={activeGame!.game_url}
              target="_blank"
              rel="noreferrer"
              className="active-game__official-website"
              aria-label={`official website ${activeGame.title}`}
            >
              Official website
            </a>
          </div>
        </div>

        <button
          type="button"
          aria-label="close active game"
          onClick={handleClickClose}
          className="active-game-btn-close"
        >
          <GrClose className="active-game-btn-close-icon"></GrClose>
        </button>

        {pathname === "/games/favorite" && (
          <button
            type="button"
            aria-label="delete favorite game"
            onClick={() => handleDeleteFavoriteGame(activeGame)}
            className="active-game-btn-trash"
          >
            <FaTrash className="active-game-btn-trash-icon"></FaTrash>
          </button>
        )}

        {pathname === "/games/games" && (
          <button
            type="button"
            aria-label="save new game to favorite"
            onClick={() => handleClickSaveNewGameToFavorite(activeGame)}
            className="active-game-btn-favorite"
          >
            <GrFavorite className="active-game-btn-favorite-icon"></GrFavorite>
          </button>
        )}
      </div>
    </div>
  );
};
