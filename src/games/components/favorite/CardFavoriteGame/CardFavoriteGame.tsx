import { Game } from "../../../../entities/entities";

import { useGamesStore } from "../../../../hooks/useGamesStore";

import "./CardFavoriteGame.css";

interface CardFavoriteGameProps {
  game: Game;
}

export const CardFavoriteGame = ({
  game,
}: CardFavoriteGameProps): JSX.Element => {
  const { handleSetActiveGame } = useGamesStore();

  const handleClick = (game: Game) => {
    handleSetActiveGame(game);
  };

  return (
    <article
      className="card_favorite_container"
      onClick={() => handleClick(game)}
    >
      <img src={game.thumbnail} alt={game.title}></img>

      <h2>{game.title}</h2>
    </article>
  );
};
