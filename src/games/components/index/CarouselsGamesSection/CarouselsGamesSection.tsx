import { useEffect, useState } from "react";

import { Game, Carousel } from "../../../../entities/entities";

import { Loader } from "../../../../ui/components/Loader/Loader";
import { CarouselGames } from "../CarouselGames/CarouselGames";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { getSliceArraySorted } from "../../../../helpers/getSliceArraySorted";
import { getGamesByCategory } from "../../../../api/getGamesByCategory";

import "./CarouselsGamesSection.css";

export const CarouselsGamesSection = (): JSX.Element => {
  const [carousels, setCarousels] = useState<Carousel<Game>[]>([]);

  const { categories } = useGamesStore();

  const handleGetGamesFromCategories = (categories: string[]): void => {
    categories.forEach(async (category) => {
      try {
        setCarousels((state) => [
          ...state,
          { name: category, isLoading: true, arr: [] },
        ]);

        const data = await getGamesByCategory(category);

        setCarousels((state) =>
          state.filter((carousel) => !carousel.isLoading)
        );
        setCarousels((state) => [
          ...state,
          { name: category, isLoading: false, arr: data.slice(0, 20) },
        ]);
      } catch (e) {
        setCarousels((state) =>
          state.filter((carousel) => !carousel.isLoading)
        );
      }
    });
  };

  useEffect(() => {
    if (!categories.length) return;

    const randomCategories = getSliceArraySorted(categories, 5);

    handleGetGamesFromCategories(randomCategories);
  }, [categories]);

  return (
    <section className="carousel_games_container">
      {carousels.map((carousel, index) => {
        return carousel.isLoading ? (
          <article
            key={`${carousel.name}-${index}`}
            className="carousel_games_container_carousel"
          >
            <Loader></Loader>
          </article>
        ) : (
          <CarouselGames
            key={`${carousel.name}-${index}`}
            games={carousel.arr}
            name={carousel.name}
          ></CarouselGames>
        );
      })}
    </section>
  );
};
