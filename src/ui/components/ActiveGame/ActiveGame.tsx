import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GrClose, GrFavorite } from "react-icons/gr";

import { Game } from "../../../entities/entities";

import { useGamesStore } from "../../../hooks/useGamesStore";

import "./ActiveGame.css";
import { useUiStore } from "../../../hooks/useUiStore";

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
    <div className="active__game-wrapper">
      <div className="active__game">
        <div className="active__game-header">
          <img src={activeGame!.thumbnail} alt={activeGame!.title}></img>

          <h2>{activeGame!.title}</h2>
        </div>

        <p>{activeGame!.short_description}</p>

        <div className="active__game-specs">
          <h3>
            Gender: <span>{activeGame!.genre}</span>
          </h3>
          <h3>
            Platform: <span>{activeGame!.platform}</span>
          </h3>
          <h3>
            Published by: <span>{activeGame!.publisher}</span>
          </h3>
          <h3>
            Developed by: <span>{activeGame!.developer}</span>
          </h3>
          <h3>
            Release date: <span>{activeGame!.release_date}</span>
          </h3>

          <div className="active__game-links">
            <a
              href={activeGame!.game_url}
              target="_blank"
              rel="noreferrer"
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
        >
          <GrClose className="close_active_game"></GrClose>
        </button>

        {pathname === "/games/favorite" && (
          <button
            type="button"
            aria-label="delete favorite game"
            onClick={() => handleDeleteFavoriteGame(activeGame)}
          >
            <FaTrash className="active_game_trash"></FaTrash>
          </button>
        )}

        {pathname === "/games/games" && (
          <button
            type="button"
            aria-label="save new game to favorite"
            onClick={() => handleClickSaveNewGameToFavorite(activeGame)}
          >
            <GrFavorite className="active_game_trash"></GrFavorite>
          </button>
        )}
      </div>
    </div>
  );
};
