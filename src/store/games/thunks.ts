import {
  deleteFavoriteGame,
  isLoadingAllGamesArray,
  setAlertFavoriteGame,
  setAllGames,
  setFavoriteGames,
  setGamesSliderOne,
  setGamesSliderTr,
  setGamesSliderTwo,
  setHomeCard,
  setHomeCardsWithInformation,
  setLoading,
  setLoadingFavoriteGames,
  setLoadingGamesSliders,
  setLoadingHomeCardsWithInformation,
  setNewGameToFavoriteGames,
} from "./exports";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import gamesApi from "../../api/gamesApi";
import { AppDispatch, RootState } from "../store";
import { Game } from "../../entities/entities";

export const startGettingInformationToHomeCard = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      dispatch(setLoadingHomeCardsWithInformation());

      const response = await gamesApi.get("/games", {
        method: "GET",
        params: { id: "452" },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_GAMES_API_KEY!,
          "X-RapidAPI-Host": process.env.REACT_APP_GAMES_HOST!,
        },
      });

      const data = await response.data;
      const shuffledData = [...data].sort(() => 0.5 - Math.random());
      const dataSliced: Game[] = shuffledData.slice(0, 12);
      const singleGame: Game = data[Math.floor(Math.random() * data.length)];

      dispatch(setHomeCard(singleGame));
      dispatch(setHomeCardsWithInformation(dataSliced));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGettingGamesToSliders = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const categories = [];

    try {
      dispatch(setLoadingGamesSliders());

      const shuffled = getState()
        .games.allCategoriesOfApi.map((value) => ({
          value,
          sort: Math.random(),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      for await (const item of shuffled) {
        if (categories.length === 3) {
          break;
        } else {
          if (categories[item as keyof string[]] || item === "all") {
            continue;
          } else {
            categories.push(item);
          }
        }
      }

      const responseSliderOne = await gamesApi.get(
        `/games?category=${categories[0]}`,
        {
          method: "GET",
          params: { id: "452" },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_GAMES_API_KEY!,
            "X-RapidAPI-Host": process.env.REACT_APP_GAMES_HOST!,
          },
        }
      );

      const dataSliderOne: Game[] = await responseSliderOne.data;
      const dataSliderOneSliced: Game[] = dataSliderOne.slice(0, 9);

      const finalObjectOne = {
        categoryName: categories[0],
        games: dataSliderOneSliced,
      };

      dispatch(setGamesSliderOne(finalObjectOne));

      const responseSliderTwo = await gamesApi.get(
        `/games?category=${categories[1]}`,
        {
          method: "GET",
          params: { id: "452" },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_GAMES_API_KEY!,
            "X-RapidAPI-Host": process.env.REACT_APP_GAMES_HOST!,
          },
        }
      );

      const dataSliderTwo: Game[] = await responseSliderTwo.data;
      const dataSliderTwoSliced: Game[] = dataSliderTwo.slice(0, 9);

      const finalObjectTwo = {
        categoryName: categories[1],
        games: dataSliderTwoSliced,
      };

      dispatch(setGamesSliderTwo(finalObjectTwo));

      const responseSliderTr = await gamesApi.get(
        `/games?category=${categories[2]}`,
        {
          method: "GET",
          params: { id: "452" },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_GAMES_API_KEY!,
            "X-RapidAPI-Host": process.env.REACT_APP_GAMES_HOST!,
          },
        }
      );

      const dataSliderTr: Game[] = await responseSliderTr.data;
      const dataSliderTrSliced: Game[] = dataSliderTr.slice(0, 9);

      const finalObjectTr = {
        categoryName: categories[2],
        games: dataSliderTrSliced,
      };

      dispatch(setGamesSliderTr(finalObjectTr));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSaveNewGameToFavorite = (objectGame: Game) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoadingFavoriteGames());

    const { uid } = getState().auth;

    const collectionRef = collection(FirebaseDB, `${uid}/games/game`);
    const { docs } = await getDocs(collectionRef);

    const gameExistInFavorite = docs.filter(
      (document) => document.data().id === objectGame.id
    );

    if (docs.length === 0) {
      const newGame = {
        developer: objectGame.developer,
        freetogame_profile_url: objectGame.freetogame_profile_url,
        game_url: objectGame.game_url,
        genre: objectGame.genre,
        id: objectGame.id,
        platform: objectGame.platform,
        publisher: objectGame.publisher,
        release_date: objectGame.release_date,
        short_description: objectGame.short_description,
        thumbnail: objectGame.thumbnail,
        title: objectGame.title,
        firebaseID: "",
      };

      const newDoc = doc(collection(FirebaseDB, `${uid}/games/game`));

      newGame.firebaseID = newDoc.id;

      await setDoc(newDoc, newGame);

      dispatch(setNewGameToFavoriteGames(objectGame));
      return dispatch(
        setAlertFavoriteGame({
          type: "success",
          message: "¡Game added to your favorites successfully!",
        })
      );
    }

    if (gameExistInFavorite.length === 0) {
      const newGame = {
        developer: objectGame.developer,
        freetogame_profile_url: objectGame.freetogame_profile_url,
        game_url: objectGame.game_url,
        genre: objectGame.genre,
        id: objectGame.id,
        platform: objectGame.platform,
        publisher: objectGame.publisher,
        release_date: objectGame.release_date,
        short_description: objectGame.short_description,
        thumbnail: objectGame.thumbnail,
        title: objectGame.title,
        firebaseID: "",
      };

      const newDoc = doc(collection(FirebaseDB, `${uid}/games/game`));

      newGame.firebaseID = newDoc.id;

      await setDoc(newDoc, newGame);

      dispatch(setNewGameToFavoriteGames(objectGame));
      return dispatch(
        setAlertFavoriteGame({
          type: "success",
          message: "¡Game added to your favorites successfully!",
        })
      );
    }
    return dispatch(
      setAlertFavoriteGame({
        type: "error",
        message: "¡You already have that game with favorite!",
      })
    );
  };
};

export const startLoadingFavoriteGames = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoadingFavoriteGames());
    const { uid } = getState().auth;

    const collectionRef = collection(FirebaseDB, `${uid}/games/game`);
    const { docs } = await getDocs(collectionRef);

    const games = docs.map((doc) => ({ id: doc.id,...doc.data() }));

    // @ts-ignore:next-line 
    dispatch(setFavoriteGames(games));
  };
};

export const startDeleteFavoriteGame = (objectGame: Game) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    const docRef = doc(
      FirebaseDB,
      `${uid}/games/game/${objectGame.firebaseID}`
    );

    await deleteDoc(docRef);

    dispatch(deleteFavoriteGame(objectGame));
  };
};

export const startGettingGamesByCategory = (category: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoadingAllGamesArray());
      if (
        category === null ||
        !category ||
        category === undefined ||
        category === "" ||
        category === "all"
      ) {
        const response = await gamesApi.get(`/games`, {
          method: "GET",
          params: { id: "452" },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_GAMES_API_KEY!,
            "X-RapidAPI-Host": process.env.REACT_APP_GAMES_HOST!,
          },
        });

        const data: Game[] = await response.data;

        dispatch(setAllGames(data));
      } else {
        const response = await gamesApi.get(`/games?category=${category}`, {
          method: "GET",
          params: { id: "452" },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_GAMES_API_KEY!,
            "X-RapidAPI-Host": process.env.REACT_APP_GAMES_HOST!,
          },
        });

        const data: Game[] = await response.data;

        dispatch(setAllGames(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
