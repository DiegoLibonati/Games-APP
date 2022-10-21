import { useGamesStore } from "../../../hooks/exports";
import { Loader } from "../../../ui/components/exports";
import "./HomeCard.css";

export const HomeCard = () => {
  const { homeCard, setNewGameToFavorite } = useGamesStore();

  const { isHomeCardLoading, title, thumbnail, genre, publisher } = homeCard;

  const saveGameToFavorite = (objectGame) => {
    setNewGameToFavorite(objectGame);
  };

  return (
    <article
      className={
        isHomeCardLoading
          ? "home_container_card effect_load"
          : "home_container_card"
      }
    >
      {isHomeCardLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <img
            className="home_container_card_img"
            src={thumbnail}
            alt={title}
          ></img>
          <div className="home_container_card_information">
            <h2>{title}</h2>
            <h3>{genre}</h3>
            <h4>{publisher}</h4>

            <button type="button" onClick={() => saveGameToFavorite(homeCard)}>
              Add to favorite
            </button>
          </div>
        </>
      )}
    </article>
  );
};
