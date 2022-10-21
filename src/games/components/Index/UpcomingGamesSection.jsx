import { upcomingGames } from "../../../helpers/exports";
import { UpcomingGame } from "./exports";
import "./UpcomingGamesSection.css";

export const UpcomingGamesSection = () => {
  const upcomingGamesArray = upcomingGames;

  return (
    <section className="upcoming_games_container">
      <h2 className="upcoming_games_container_title">Upcoming Games</h2>
      <div className="line_wrapper">
        <div className="line"></div>
      </div>

      {upcomingGamesArray.map((upcomingGame) => (
        <UpcomingGame key={upcomingGame.img} {...upcomingGame}></UpcomingGame>
      ))}
    </section>
  );
};
