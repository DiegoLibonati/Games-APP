import { useDispatch, useSelector } from "react-redux";
import {
  resetActiveGame,
  resetAllGames,
  setActiveGame,
  startDeleteFavoriteGame,
  startSaveNewGameToFavorite,
} from "../store/games/exports";

export const useGamesStore = () => {
  const dispatch = useDispatch();

  const {
    homeCard,
    gamesSliders,
    homeCardsWithInformation,
    favoriteGames,
    activeGame,
    allGames,
    allCategoriesOfApi,
    alertFavoriteGame,
  } = useSelector((state) => state.games);

  const setNewGameToFavorite = (objectGame) => {
    dispatch(startSaveNewGameToFavorite(objectGame));
  };

  const onDeleteGameInFavorite = (favoriteGame) => {
    dispatch(startDeleteFavoriteGame(favoriteGame));
  };

  const onActiveGame = (game) => {
    dispatch(setActiveGame(game));
  };

  const onResetActiveGame = () => {
    dispatch(resetActiveGame());
  };

  const resetAllGamesArray = () => {
    dispatch(resetAllGames());
  };

  return {
    homeCard,
    gamesSliders,
    homeCardsWithInformation,
    favoriteGames,
    activeGame,
    allGames,
    allCategoriesOfApi,
    alertFavoriteGame,
    setNewGameToFavorite,
    onDeleteGameInFavorite,
    onActiveGame,
    onResetActiveGame,
    resetAllGamesArray,
  };
};
