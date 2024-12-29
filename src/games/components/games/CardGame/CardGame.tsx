import { useGamesStore } from "../../../../hooks/useGamesStore";

import { Game } from "../../../../entities/entities";

interface CardGameProps {
  game: Game;
}

export const CardGame = ({ game }: CardGameProps): JSX.Element => {
  const { handleSetActiveGame } = useGamesStore();

  const showActiveGame = (game: Game) => {
    handleSetActiveGame(game);
  };

  return (
    <article
      className="main_games_section_container_grid_games_game"
      onClick={() => showActiveGame(game)}
    >
      <img src={game.thumbnail} alt={game.title}></img>

      <h2>{game.title}</h2>
    </article>
  );
};
