import { useMemo } from "react";

import { CardGame } from "../CardGame/CardGame";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { getSliceArraySorted } from "../../../../helpers/getSliceArraySorted";

import "./ShowGamesSection.css";

export const ShowGamesSection = (): JSX.Element => {
  const { games } = useGamesStore();

  const shuffledGames = useMemo(() => getSliceArraySorted(games, 12), [games]);

  return (
    <section className="show__games">
      <h2 className="show__games-title">Other Games</h2>
      <article className="line__wrapper">
        <div className="line"></div>
      </article>

      <article className="show__games-cards">
        {shuffledGames?.map((game) => (
          <CardGame key={game.id} game={game}></CardGame>
        ))}
      </article>
    </section>
  );
};
