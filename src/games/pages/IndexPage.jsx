import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  startGettingGamesToSliders,
  startGettingInformationToHomeCard,
} from "../../store/games/exports";
import { Footer, NavBar } from "../../ui/components/exports";
import {
  CardsGamesSection,
  SliderGamesSection,
  UpcomingGamesSection,
  Home,
} from "../components/Index/exports";

export const IndexPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGettingInformationToHomeCard());
    dispatch(startGettingGamesToSliders());
  }, [dispatch]);

  return (
    <>
      <NavBar></NavBar>

      <main className="main_container_index">
        <Home></Home>

        <SliderGamesSection></SliderGamesSection>

        <CardsGamesSection></CardsGamesSection>

        <UpcomingGamesSection></UpcomingGamesSection>
      </main>

      <Footer></Footer>
    </>
  );
};
