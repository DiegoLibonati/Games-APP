import { Game, SliderGamesProps } from "../../../entities/entities";
import { useGamesStore } from "../../../hooks/exports";
import "./SliderGames.css";

export const SliderGames = ({
  games,
  categoryName,
}: SliderGamesProps): JSX.Element => {
  const { setNewGameToFavorite } = useGamesStore();

  const saveGameToFavorite = (objectGame: Game) => {
    setNewGameToFavorite(objectGame);
  };

  return (
    <article className="slider_games_container_slider">
      <h2>{categoryName}</h2>

      <div className="slider_games_container_slider_track">
        {games.map((game) => {
          const { id, thumbnail } = game;
          return (
            <div className="slider-item" key={id}>
              <img src={thumbnail} alt="img"></img>
              <button
                className="slider-item-button"
                type="button"
                onClick={() => saveGameToFavorite(game)}
              >
                Go To Fav
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};
