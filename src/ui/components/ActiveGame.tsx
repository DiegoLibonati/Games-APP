import "./ActiveGame.css";
import { GrClose, GrFavorite } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { useGamesStore } from "../../hooks/exports";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const ActiveGame = (): JSX.Element => {
  const { pathname } = useLocation();

  const {
    activeGame,
    onResetActiveGame,
    onDeleteGameInFavorite,
    setNewGameToFavorite,
  } = useGamesStore();

  const handleDeleteFavoriteGame = () => {
    onResetActiveGame();
    onDeleteGameInFavorite(activeGame!);
    Swal.fire(
      "Favorite Game",
      "¡Game deleted from your favorites successfully!",
      "success"
    );
  };

  const saveGameToFavorite = () => {
    onResetActiveGame();
    setNewGameToFavorite(activeGame!);
  };

  return (
    <div className="active_game_wrapper">
      <div className="active_game_container">
        <div className="active_game_container_header">
          <img src={activeGame!.thumbnail} alt={activeGame!.title}></img>

          <h2>{activeGame!.title}</h2>
        </div>

        <p>{activeGame!.short_description}</p>

        <div className="active_game_container_specs">
          <h3>
            Gender: <span>{activeGame!.genre}</span>
          </h3>
          <h3>
            Platform: <span>{activeGame!.platform}</span>
          </h3>
          <h3>
            Published by : <span>{activeGame!.publisher}</span>
          </h3>
          <h3>
            Developed by : <span>{activeGame!.developer}</span>
          </h3>
          <h3>
            Release date: <span>{activeGame!.release_date}</span>
          </h3>

          <div className="active_game_container_specs_links">
            <a href={activeGame!.game_url} target="_blank" rel="noreferrer">
              Official website
            </a>
          </div>
        </div>

        <GrClose
          onClick={onResetActiveGame}
          className="close_active_game"
        ></GrClose>

        {pathname === "/games/favorite" && (
          <FaTrash
            className="active_game_trash"
            onClick={() => handleDeleteFavoriteGame()}
          ></FaTrash>
        )}

        {pathname === "/games/games" && (
          <GrFavorite
            className="active_game_trash"
            onClick={() => saveGameToFavorite()}
          ></GrFavorite>
        )}
      </div>
    </div>
  );
};
