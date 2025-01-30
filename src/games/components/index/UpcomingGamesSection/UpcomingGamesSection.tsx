import { UpcomingGame } from "../UpcomingGame/UpcomingGame";

import { upcomingGames } from "../../../../constants/games";

import "./UpcomingGamesSection.css";

export const UpcomingGamesSection = (): JSX.Element => {
  return (
    <section className="upcoming-games">
      <h2 className="upcoming-games__title">Upcoming Games</h2>

      <div className="line-wrapper">
        <div className="line"></div>
      </div>

      {upcomingGames.map((upcomingGame) => (
        <UpcomingGame
          key={upcomingGame.img}
          img={upcomingGame.img}
          name={upcomingGame.name}
          release_date={upcomingGame.release_date}
        ></UpcomingGame>
      ))}
    </section>
  );
};
