import { useSelector } from "react-redux";
import {
  resetActiveGame,
  resetAllGames,
  setActiveGame,
  startDeleteFavoriteGame,
  startSaveNewGameToFavorite,
} from "../store/games/exports";
import { RootState, useAppDispatch } from "../store/store";
import { Game, UseGameStore } from "../entities/entities";

export const useGamesStore = (): UseGameStore => {
  const dispatch = useAppDispatch();

  const {
    homeCard,
    gamesSliders,
    homeCardsWithInformation,
    favoriteGames,
    activeGame,
    allGames,
    allCategoriesOfApi,
    alertFavoriteGame,
  } = useSelector((state: RootState) => state.games);

  const setNewGameToFavorite = (objectGame: Game): void => {
    dispatch(startSaveNewGameToFavorite(objectGame));
  };

  const onDeleteGameInFavorite = (favoriteGame: Game): void => {
    dispatch(startDeleteFavoriteGame(favoriteGame));
  };

  const onActiveGame = (game: Game): void => {
    dispatch(setActiveGame(game));
  };

  const onResetActiveGame = (): void => {
    dispatch(resetActiveGame());
  };

  const resetAllGamesArray = (): void => {
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
