import "./ActiveGame.css";
import { GrClose, GrFavorite } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { useGamesStore } from "../../hooks/exports";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const ActiveGame = () => {
  const { pathname } = useLocation();

  const { activeGame, onResetActiveGame, onDeleteGameInFavorite } =
    useGamesStore();

  const {
    title,
    thumbnail,
    short_description,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    game_url,
  } = activeGame;

  const handleDeleteFavoriteGame = (favoriteGame) => {
    onResetActiveGame();
    onDeleteGameInFavorite(favoriteGame);
    Swal.fire(
      "Favorite Game",
      "¡Game deleted from your favorites successfully!",
      "success"
    );
  };

  const { setNewGameToFavorite } = useGamesStore();

  const saveGameToFavorite = (objectGame) => {
    onResetActiveGame();
    setNewGameToFavorite(objectGame);
  };

  return (
    <div className="active_game_wrapper">
      <div className="active_game_container">
        <div className="active_game_container_header">
          <img src={thumbnail} alt={title}></img>

          <h2>{title}</h2>
        </div>

        <p>{short_description}</p>

        <div className="active_game_container_specs">
          <h3>
            Gender: <span>{genre}</span>
          </h3>
          <h3>
            Platform: <span>{platform}</span>
          </h3>
          <h3>
            Published by : <span>{publisher}</span>
          </h3>
          <h3>
            Developed by : <span>{developer}</span>
          </h3>
          <h3>
            Release date: <span>{release_date}</span>
          </h3>

          <div className="active_game_container_specs_links">
            <a href={game_url} target="_blank" rel="noreferrer">
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
            onClick={() => handleDeleteFavoriteGame(activeGame)}
          ></FaTrash>
        )}

        {pathname === "/games/games" && (
          <GrFavorite
            className="active_game_trash"
            onClick={() => saveGameToFavorite(activeGame)}
          ></GrFavorite>
        )}
      </div>
    </div>
  );
};
