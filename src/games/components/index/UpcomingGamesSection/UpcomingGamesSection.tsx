import { UpcomingGame } from "../UpcomingGame/UpcomingGame";

import { upcomingGames } from "../../../../constants/games";

import "./UpcomingGamesSection.css";

export const UpcomingGamesSection = (): JSX.Element => {
  return (
    <section className="upcoming_games_container">
      <h2 className="upcoming_games_container_title">Upcoming Games</h2>
      <div className="line_wrapper">
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
