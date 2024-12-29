import "./UpcomingGame.css";

interface UpcomingGameProps {
  img: string;
  name: string;
  release_date: string;
}

export const UpcomingGame = ({
  img,
  name,
  release_date,
}: UpcomingGameProps): JSX.Element => {
  return (
    <article className="upcoming_game_container">
      <img className="upcoming_game_container_img" src={img} alt={name}></img>

      <h2 className="upcoming_game_container_h2">
        {name} <br></br> {release_date}
      </h2>
    </article>
  );
};
