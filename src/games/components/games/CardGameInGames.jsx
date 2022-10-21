import { useGamesStore } from "../../../hooks/exports";

export const CardGameInGames = ({ thumbnail, title, game }) => {
  const { onActiveGame } = useGamesStore();

  const showActiveGame = (game) => {
    onActiveGame(game);
  };
  return (
    <article
      className="main_games_section_container_grid_games_game"
      onClick={() => showActiveGame(game)}
    >
      <img src={thumbnail} alt={title}></img>

      <h2>{title}</h2>
    </article>
  );
};
