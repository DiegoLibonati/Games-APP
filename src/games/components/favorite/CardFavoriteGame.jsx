import { useGamesStore } from "../../../hooks/exports";
import "./CardFavoriteGame.css";

export const CardFavoriteGame = ({ thumbnail, title, favoriteGame }) => {
  const { onActiveGame } = useGamesStore();

  const showActiveGame = (game) => {
    onActiveGame(game);
  };

  return (
    <article
      className="card_favorite_container"
      onClick={() => showActiveGame(favoriteGame)}
    >
      <img src={thumbnail} alt={title}></img>

      <h2>{title}</h2>
    </article>
  );
};
