import { CardFavoriteGameProps } from "../../../entities/entities";
import { useGamesStore } from "../../../hooks/exports";
import "./CardFavoriteGame.css";

export const CardFavoriteGame = ({
  thumbnail,
  title,
  favoriteGame,
}: CardFavoriteGameProps): JSX.Element => {
  const { onActiveGame } = useGamesStore();

  const showActiveGame = () => {
    onActiveGame(favoriteGame);
  };

  return (
    <article
      className="card_favorite_container"
      onClick={() => showActiveGame()}
    >
      <img src={thumbnail} alt={title}></img>

      <h2>{title}</h2>
    </article>
  );
};
