import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeCard: {
    isHomeCardLoading: false,
    developer: "",
    freetogame_profile_url: "",
    game_url: "",
    genre: "",
    id: "",
    platform: "",
    publisher: "",
    release_date: "",
    short_description: "",
    thumbnail: "",
    title: "",
  },
  gamesSliders: {
    gamesSliderCategoryOne: {
      isGamesSlidersLoadingOne: false,
      categoryNameOne: "",
      gamesOne: [],
    },
    gamesSliderCategoryTwo: {
      isGamesSlidersLoadingTwo: false,
      categoryNameTwo: "",
      gamesTwo: [],
    },
    gamesSliderCategoryTr: {
      isGamesSlidersLoadingTr: false,
      categoryNameTr: "",
      gamesTr: [],
    },
  },
  homeCardsWithInformation: {
    isHomeCardsWithInformationLoading: false,
    homeCardsWithInformationArray: null,
  },
  favoriteGames: {
    favoriteGamesArray: [],
    isFavoriteGamesLoading: false,
  },
  alertFavoriteGame: {
    isLoadingAlert: false,
    type: "",
    message: "",
  },
  activeGame: null,
  allGames: {
    allGamesArray: [],
    isAllGamesArrayLoading: false,
  },
  allCategoriesOfApi: [
    "all",
    "mmorpg",
    "shooter",
    "strategy",
    "moba",
    "racing",
    "sports",
    "social",
    "sandbox",
    "open-world",
    "survival",
    "pvp",
    "pve",
    "pixel",
    "voxel",
    "zombie",
    "turn-based",
    "first-person",
    "third-Person",
    "top-down",
    "tank",
    "space",
    "sailing",
    "side-scroller",
    "superhero",
    "permadeath",
    "card",
    "battle-royale",
    "mmo",
    "mmofps",
    "mmotps",
    "3d",
    "2d",
    "anime",
    "fantasy",
    "sci-fi",
    "fighting",
    "action-rpg",
    "action",
    "military",
    "martial-arts",
    "flight",
    "low-spec",
    "tower-defense",
    "horror",
    "mmorts",
  ],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.homeCard.isHomeCardLoading = true;
    },
    setHomeCard: (state, action) => {
      state.homeCard.isHomeCardLoading = false;
      state.homeCard.title = action.payload.title;
      state.homeCard.thumbnail = action.payload.thumbnail;
      state.homeCard.genre = action.payload.genre;
      state.homeCard.publisher = action.payload.publisher;
      state.homeCard.developer = action.payload.developer;
      state.homeCard.freetogame_profile_url =
        action.payload.freetogame_profile_url;
      state.homeCard.game_url = action.payload.game_url;
      state.homeCard.id = action.payload.id;
      state.homeCard.platform = action.payload.platform;
      state.homeCard.release_date = action.payload.release_date;
      state.homeCard.short_description = action.payload.short_description;
    },
    setLoadingGamesSliders: (state) => {
      state.gamesSliders.gamesSliderCategoryOne.isGamesSlidersLoadingOne = true;
      state.gamesSliders.gamesSliderCategoryTwo.isGamesSlidersLoadingTwo = true;
      state.gamesSliders.gamesSliderCategoryTr.isGamesSlidersLoadingTr = true;
    },
    setGamesSliderOne: (state, action) => {
      state.gamesSliders.gamesSliderCategoryOne.categoryNameOne =
        action.payload.categoryName;
      state.gamesSliders.gamesSliderCategoryOne.gamesOne = action.payload.games;
      state.gamesSliders.gamesSliderCategoryOne.isGamesSlidersLoadingOne = false;
    },
    setGamesSliderTwo: (state, action) => {
      state.gamesSliders.gamesSliderCategoryTwo.categoryNameTwo =
        action.payload.categoryName;
      state.gamesSliders.gamesSliderCategoryTwo.gamesTwo = action.payload.games;
      state.gamesSliders.gamesSliderCategoryTwo.isGamesSlidersLoadingTwo = false;
    },
    setGamesSliderTr: (state, action) => {
      state.gamesSliders.gamesSliderCategoryTr.categoryNameTr =
        action.payload.categoryName;
      state.gamesSliders.gamesSliderCategoryTr.gamesTr = action.payload.games;
      state.gamesSliders.gamesSliderCategoryTr.isGamesSlidersLoadingTr = false;
    },
    setLoadingHomeCardsWithInformation: (state) => {
      state.homeCardsWithInformation.isHomeCardsWithInformationLoading = true;
    },
    setHomeCardsWithInformation: (state, action) => {
      state.homeCardsWithInformation.isHomeCardsWithInformationLoading = false;
      state.homeCardsWithInformation.homeCardsWithInformationArray =
        action.payload;
    },
    setLoadingFavoriteGames: (state) => {
      state.favoriteGames.favoriteGamesArray = [];
      state.favoriteGames.isFavoriteGamesLoading = true;
    },
    setNewGameToFavoriteGames: (state, action) => {
      state.favoriteGames.favoriteGamesArray.push(action.payload);
    },
    setAlertFavoriteGame: (state, action) => {
      state.alertFavoriteGame.isLoadingAlert = true;
      state.alertFavoriteGame.type = action.payload.type;
      state.alertFavoriteGame.message = action.payload.message;
      state.alertFavoriteGame.isLoadingAlert = false;
    },
    resetAlertFavoriteGame: (state) => {
      state.alertFavoriteGame.type = "";
      state.alertFavoriteGame.message = "";
      state.alertFavoriteGame.isLoadingAlert = false;
    },
    setFavoriteGames: (state, action) => {
      state.favoriteGames.isFavoriteGamesLoading = true;
      state.favoriteGames.favoriteGamesArray = action.payload;
      state.favoriteGames.isFavoriteGamesLoading = false;
    },
    deleteFavoriteGame: (state, action) => {
      state.favoriteGames.favoriteGamesArray =
        state.favoriteGames.favoriteGamesArray.filter(
          (favoriteGame) => favoriteGame.id !== action.payload.id
        );
    },
    setActiveGame: (state, action) => {
      state.activeGame = action.payload;
    },
    resetActiveGame: (state) => {
      state.activeGame = null;
    },
    isLoadingAllGamesArray: (state) => {
      state.allGames.allGamesArray = [];
      state.allGames.isAllGamesArrayLoading = true;
    },
    setAllGames: (state, action) => {
      state.allGames.isAllGamesArrayLoading = true;
      state.allGames.allGamesArray = action.payload;
      state.allGames.isAllGamesArrayLoading = false;
    },
    resetAllGames: (state) => {
      state.allGames.allGamesArray = [];
      state.allGames.isAllGamesArrayLoading = false;
    },
    resetAll: (state) => {
      state.homeCard.isHomeCardLoading = false;
      state.homeCard.title = "";
      state.homeCard.thumbnail = "";
      state.homeCard.genre = "";
      state.homeCard.publisher = "";
      state.homeCard.developer = "";
      state.homeCard.freetogame_profile_url = "";
      state.homeCard.game_url = "";
      state.homeCard.id = "";
      state.homeCard.platform = "";
      state.homeCard.release_date = "";
      state.homeCard.short_description = "";

      state.gamesSliders.gamesSliderCategoryOne.categoryNameOne = "";
      state.gamesSliders.gamesSliderCategoryOne.gamesOne = [];
      state.gamesSliders.gamesSliderCategoryOne.isGamesSlidersLoadingOne = false;

      state.gamesSliders.gamesSliderCategoryTwo.categoryNameTwo = "";
      state.gamesSliders.gamesSliderCategoryTwo.gamesTwo = [];
      state.gamesSliders.gamesSliderCategoryTwo.isGamesSlidersLoadingTwo = false;

      state.gamesSliders.gamesSliderCategoryTr.categoryNameTr = "";
      state.gamesSliders.gamesSliderCategoryTr.gamesTr = [];
      state.gamesSliders.gamesSliderCategoryTr.isGamesSlidersLoadingTr = false;

      state.homeCardsWithInformation.isHomeCardsWithInformationLoading = false;
      state.homeCardsWithInformation.homeCardsWithInformationArray = [];

      state.favoriteGames.favoriteGamesArray = [];
      state.favoriteGames.isFavoriteGamesLoading = false;

      state.alertFavoriteGame.type = "";
      state.alertFavoriteGame.message = "";

      state.activeGame = null;

      state.allGames.allGamesArray = [];
      state.allGames.isAllGamesArrayLoading = false;
    },
  },
});

export const {
  setLoading,
  setHomeCard,
  setLoadingGamesSliders,
  setGamesSliderOne,
  setGamesSliderTwo,
  setGamesSliderTr,
  setLoadingHomeCardsWithInformation,
  setHomeCardsWithInformation,
  setLoadingFavoriteGames,
  setFavoriteGames,
  setNewGameToFavoriteGames,
  deleteFavoriteGame,
  setActiveGame,
  resetActiveGame,
  resetAll,
  isLoadingAllGamesArray,
  setAllGames,
  resetAllGames,
  resetAlertIsNotExistGameInFavorite,
  setAlertFavoriteGame,
  resetAlertFavoriteGame,
} = gamesSlice.actions;

export default gamesSlice.reducer;
