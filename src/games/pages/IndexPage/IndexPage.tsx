import { Fragment, useEffect } from "react";

import { Footer } from "../../../ui/components/Footer/Footer";
import { NavBar } from "../../../ui/components/NavBar/NavBar";
import { HomeImagesSection } from "../../components/index/HomeImagesSection/HomeImagesSection";
import { CarouselsGamesSection } from "../../components/index/CarouselsGamesSection/CarouselsGamesSection";
import { ShowGamesSection } from "../../components/index/ShowGamesSection/ShowGamesSection";
import { UpcomingGamesSection } from "../../components/index/UpcomingGamesSection/UpcomingGamesSection";

import { useGamesStore } from "../../../hooks/useGamesStore";

import "./IndexPage.css";

export const IndexPage = (): JSX.Element => {
  const { handleGetGames, handleSetToInitialState } = useGamesStore();

  const onInit = (): void => {
    console.log("Init - Index Page");
    handleGetGames();
  };

  const onDestroy = (): void => {
    console.log("Destroy - Index Page");
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return () => onDestroy();
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>

      <main className="main-index-page">
        <HomeImagesSection></HomeImagesSection>
        <CarouselsGamesSection></CarouselsGamesSection>
        <ShowGamesSection></ShowGamesSection>
        <UpcomingGamesSection></UpcomingGamesSection>
      </main>

      <Footer></Footer>
    </Fragment>
  );
};
