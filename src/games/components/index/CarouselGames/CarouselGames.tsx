import { Game } from "../../../../entities/entities";

import { useGamesStore } from "../../../../hooks/useGamesStore";

import "./CarouselGames.css";

interface CarouselGamesProps {
  name: string;
  games: Game[];
}

export const CarouselGames = ({ name, games }: CarouselGamesProps): JSX.Element => {
  const { handleSetNewGameToFavorite } = useGamesStore();

  const handleSetFavoriteGame = (game: Game) => {
    handleSetNewGameToFavorite(game);
  };

  return (
    <article className="carousel_games_container_carousel">
      <h2>{name}</h2>

      <div className="carousel_games_container_carousel_track">
        {games.map((game) => {
          return (
            <div className={`carousel-item game-${game.id}`} key={game.id}>
              <img src={game.thumbnail} alt={game.title}></img>
              <button
                className="carousel-item-button"
                type="button"
                aria-label={`add game to fav ${game.title}`}
                onClick={() => handleSetFavoriteGame(game)}
              >
                Add To Fav
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};
