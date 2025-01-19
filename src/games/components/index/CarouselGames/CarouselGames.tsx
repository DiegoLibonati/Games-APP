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
    <article className="carousel__games">
      <h2>{name}</h2>

      <div className="carousel__games-track">
        {games.map((game) => {
          return (
            <div className={`carousel__games-item game__${game.id}`} key={game.id}>
              <img src={game.thumbnail} alt={game.title}></img>
              <button
                className="carousel__games-item-button"
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
