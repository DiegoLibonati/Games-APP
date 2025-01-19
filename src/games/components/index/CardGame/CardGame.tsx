import { useState } from "react";

import { Game } from "../../../../entities/entities";

import { useGamesStore } from "../../../../hooks/useGamesStore";

import "./CardGame.css";

interface CardGameProps {
  game: Game;
}

export const CardGame = ({ game }: CardGameProps): JSX.Element => {
  const [isInformationOpen, setIsInformationOpen] = useState<boolean>(false);

  const { handleSetNewGameToFavorite } = useGamesStore();

  const handleClick = () => {
    setIsInformationOpen(true);
  };

  const handleDoubleClick = () => {
    setIsInformationOpen(false);
  };

  const handleTouchEnd = () => {
    setIsInformationOpen(false);
  };

  const handleTouchCancel = () => {
    setIsInformationOpen(false);
  };

  const handleSaveGameToFavorite = (game: Game) => {
    handleSetNewGameToFavorite(game);
  };

  return (
    <div
      className={`index__page-card`}
      style={{ animationName: isInformationOpen ? "nospin" : "spin" }}
    >
      <div
        className={`index__page-card-img ${
          isInformationOpen && "index__page-card-img--open"
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        style={{ backgroundImage: `url(${game.thumbnail})` }}
      >
        <div
          style={isInformationOpen ? { display: "none" } : { display: "block" }}
        ></div>
      </div>
      <div
        className={`index__page-card-information ${
          isInformationOpen && "index__page-card-information--open"
        }`}
      >
        <h2>{game.title}</h2>
        <p>{game.short_description}</p>
        <h3>
          Gender: <span>{game.genre}</span>
        </h3>
        <h3>
          Platform: <span>{game.platform}</span>
        </h3>
        <h3>
          Published by: <span>{game.publisher}</span>
        </h3>
        <h3>
          Developed by: <span>{game.developer}</span>
        </h3>
        <h3>
          Release date: <span>{game.release_date}</span>
        </h3>

        <div className="index__page-card-links">
          <a
            href={game.freetogame_profile_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`go to official website ${game.title}`}
          >
            Official website
          </a>

          <button
            type="button"
            onClick={() => handleSaveGameToFavorite(game)}
            aria-label={`add to favorites ${game.title}`}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};
