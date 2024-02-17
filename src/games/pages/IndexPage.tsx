import { useEffect } from "react";
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
import { useAppDispatch } from "../../store/store";

export const IndexPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

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
