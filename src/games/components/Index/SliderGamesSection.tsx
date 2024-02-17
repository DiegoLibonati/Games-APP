import { useGamesStore } from "../../../hooks/exports";
import { Loader } from "../../../ui/components/exports";
import { SliderGames } from "./exports";
import "./SliderGamesSection.css";

export const SliderGamesSection = (): JSX.Element => {
  const { gamesSliders } = useGamesStore();

  const {
    gamesSliderCategoryOne,
    gamesSliderCategoryTwo,
    gamesSliderCategoryTr,
  } = gamesSliders;

  const { isGamesSlidersLoadingOne, categoryNameOne, gamesOne } =
    gamesSliderCategoryOne;
  const { isGamesSlidersLoadingTwo, categoryNameTwo, gamesTwo } =
    gamesSliderCategoryTwo;
  const { isGamesSlidersLoadingTr, categoryNameTr, gamesTr } =
    gamesSliderCategoryTr;

  return (
    <section className="slider_games_container">
      {isGamesSlidersLoadingOne ? (
        <article className="slider_games_container_slider">
          <Loader></Loader>
        </article>
      ) : (
        <SliderGames
          games={gamesOne}
          categoryName={categoryNameOne}
        ></SliderGames>
      )}

      {isGamesSlidersLoadingTwo ? (
        <article className="slider_games_container_slider">
          <Loader></Loader>
        </article>
      ) : (
        <SliderGames
          games={gamesTwo}
          categoryName={categoryNameTwo}
        ></SliderGames>
      )}

      {isGamesSlidersLoadingTr ? (
        <article className="slider_games_container_slider">
          <Loader></Loader>
        </article>
      ) : (
        <SliderGames
          games={gamesTr}
          categoryName={categoryNameTr}
        ></SliderGames>
      )}
    </section>
  );
};
