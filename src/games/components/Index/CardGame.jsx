import { useState, useRef } from "react";
import { useGamesStore } from "../../../hooks/exports";
import { Loader } from "../../../ui/components/exports";
import "./CardGame.css";

export const CardGame = ({
  title,
  thumbnail,
  short_description,
  genre,
  platform,
  publisher,
  developer,
  release_date,
  freetogame_profile_url,
  isLoading,
  objectGame,
}) => {
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const refInformation = useRef(null);
  const refDiv = useRef(null);

  const onInformationClick = () => {
    refInformation.current.className =
      "card_game_container_information open_information_card_game";
    refDiv.current.style.animationName = "nospin";

    setIsInformationOpen(true);
  };

  const onInformationDoubleClick = () => {
    refInformation.current.className = "card_game_container_information";
    setIsInformationOpen(false);

    setTimeout(() => {
      refDiv.current.style.animationName = "spin";
    }, 1000);
  };

  const onInformationTouchEnd = () => {
    refInformation.current.className = "card_game_container_information";
    setIsInformationOpen(false);

    setTimeout(() => {
      refDiv.current.style.animationName = "spin";
    }, 1000);
  };

  const onInformationTouchCancel = () => {
    refInformation.current.className = "card_game_container_information";
    setIsInformationOpen(false);

    setTimeout(() => {
      refDiv.current.style.animationName = "spin";
    }, 1000);
  };

  const { setNewGameToFavorite } = useGamesStore();

  const saveGameToFavorite = (objectGame) => {
    setNewGameToFavorite(objectGame);
  };

  return (
    <article className="card_game_container" ref={refDiv}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <div
            className={
              isInformationOpen
                ? "card_game_container_img card_game_container_img_open"
                : "card_game_container_img"
            }
            onClick={onInformationClick}
            onDoubleClick={onInformationDoubleClick}
            onTouchEnd={onInformationTouchEnd}
            onTouchCancel={onInformationTouchCancel}
            style={{ backgroundImage: `url(${thumbnail})` }}
          >
            <div
              style={
                isInformationOpen ? { display: "none" } : { display: "block" }
              }
            ></div>
          </div>
          <div className="card_game_container_information" ref={refInformation}>
            <h2>{title}</h2>
            <p>{short_description}</p>
            <h3>
              Gender: <span>{genre}</span>
            </h3>
            <h3>
              Platform: <span>{platform}</span>
            </h3>
            <h3>
              Published by : <span>{publisher}</span>
            </h3>
            <h3>
              Developed by : <span>{developer}</span>
            </h3>
            <h3>
              Release date: <span>{release_date}</span>
            </h3>

            <div className="card_game_container_information_links">
              <a href={freetogame_profile_url} target="_blank" rel="noreferrer">
                Official website
              </a>

              <button
                type="button"
                onClick={() => saveGameToFavorite(objectGame)}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
};
