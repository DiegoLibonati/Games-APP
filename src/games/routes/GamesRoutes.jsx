import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { IndexPage, FavoritePage, GamesPage } from "../pages/exports";
import { IoMdRocket } from "react-icons/io";
import { ActiveGame, LoaderAlert } from "../../ui/components/exports";
import { useGamesStore } from "../../hooks/exports";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { resetAlertFavoriteGame } from "../../store/games/exports";
import { useDispatch } from "react-redux";

export const GamesRoutes = () => {
  const {
    activeGame,
    alertFavoriteGame,
    onResetActiveGame,
    resetAllGamesArray,
  } = useGamesStore();

  const location = useLocation();
  const dispatch = useDispatch();

  const { type, message, isLoadingAlert } = alertFavoriteGame;

  useEffect(() => {
    onResetActiveGame();
    resetAllGamesArray();
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (message && type) {
      Swal.fire("Favorite Game", message, type);
      dispatch(resetAlertFavoriteGame());
    }
    // eslint-disable-next-line
  }, [type, message]);

  return (
    <>
      <Routes>
        <Route path="/games/index" element={<IndexPage></IndexPage>}></Route>

        <Route
          path="/games/favorite"
          element={<FavoritePage></FavoritePage>}
        ></Route>

        <Route path={`/games/games`} element={<GamesPage></GamesPage>}></Route>

        <Route
          path="/*"
          element={<Navigate to="/games/index"></Navigate>}
        ></Route>
      </Routes>

      <IoMdRocket
        className="rocket-top"
        onClick={() => window.scrollTo(0, 0)}
      ></IoMdRocket>

      {activeGame && <ActiveGame></ActiveGame>}

      {isLoadingAlert && <LoaderAlert></LoaderAlert>}
    </>
  );
};
