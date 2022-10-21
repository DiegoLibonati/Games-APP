import { useGamesStore } from "../../../hooks/exports";
import { CardGame } from "./exports";
import "./CardsGamesSection.css";

export const CardsGamesSection = () => {
  const { homeCardsWithInformation } = useGamesStore();

  const { isHomeCardsWithInformationLoading, homeCardsWithInformationArray } =
    homeCardsWithInformation;

  return (
    <section className="cards_games_section_container">
      <h2 className="cards_games_section_container_title">Other Games</h2>
      <div className="line_wrapper">
        <div className="line"></div>
      </div>

      {homeCardsWithInformationArray?.map((homeCard) => (
        <CardGame
          key={homeCard.id}
          {...homeCard}
          isLoading={isHomeCardsWithInformationLoading}
          objectGame={homeCard}
        ></CardGame>
      ))}
    </section>
  );
};
