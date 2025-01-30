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
    <article className="card-favorite-game" onClick={() => handleClick(game)}>
      <img
        src={game.thumbnail}
        alt={game.title}
        className="card-favorite-game__img"
      ></img>

      <h2 className="card-favorite-game__title">{game.title}</h2>
    </article>
  );
};
