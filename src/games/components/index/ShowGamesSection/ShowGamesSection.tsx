import { useMemo } from "react";

import { CardGame } from "../CardGame/CardGame";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { getSliceArraySorted } from "../../../../helpers/getSliceArraySorted";

import "./ShowGamesSection.css";

export const ShowGamesSection = (): JSX.Element => {
  const { games } = useGamesStore();

  const shuffledGames = useMemo(() => getSliceArraySorted(games, 12), [games]);

  return (
    <section className="cards_games_section_container">
      <h2 className="cards_games_section_container_title">Other Games</h2>
      <article className="line_wrapper">
        <div className="line"></div>
      </article>

      <article className="card_games_section_container_list">
        {shuffledGames?.map((game) => (
          <CardGame key={game.id} game={game}></CardGame>
        ))}
      </article>
    </section>
  );
};
