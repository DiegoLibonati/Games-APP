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
    <article className="upcoming__game">
      <img className="upcoming__game-img" src={img} alt={name}></img>

      <h2 className="upcoming__game-title">
        {name} <br></br> {release_date}
      </h2>
    </article>
  );
};
