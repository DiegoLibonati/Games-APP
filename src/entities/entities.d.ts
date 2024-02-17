import { SweetAlertIcon } from "sweetalert2";

// Types
export type UseCheckAuth = {
  status: string | null;
};

export type UseAuthStore = {
  imagesLoginAndRegister: string[];
  isLoading: boolean;
  isChecking: boolean;
  status: string | null;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
  handleLogOut: () => void;
  handleLoginWithEmailAndPassword: ({ email, passowrd }: FormDataAuth) => void;
  handleLoginWithGoogle: () => void;
  handleCreateNewUserWithEmailAndPassword: (
    formState: Required<FormDataAuth>
  ) => void;
};

export type AuthState = {
  imagesLoginAndRegister: string[];
  isLoading: boolean;
  isChecking: boolean;
  status: string | null;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
};

export type FormDataAuth = {
  email: string;
  password: string;
  username?: string;
};

export type FormDataRegister = {
  email: string;
  password: string;
  repeatpassword: string;
  username: string;
};

export type UseSlide<T> = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
};

export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  firebaseID?: string;
};

export type SignInWithGoogle = {
  ok: boolean;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
  errorMessage?: string | null;
};

export type RegisterUserWithEmail = {
  ok: boolean;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
  errorMessage?: string | null;
};

export type LoginWithEmailPassword = {
  ok: boolean;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
  errorMessage?: string | null;
};

export type UseGameStore = {
  homeCard: GamesState["homeCard"];
  gamesSliders: GamesState["gamesSliders"];
  homeCardsWithInformation: GamesState["homeCardsWithInformation"];
  favoriteGames: GamesState["favoriteGames"];
  activeGame: GamesState["activeGame"];
  allGames: GamesState["allGames"];
  allCategoriesOfApi: GamesState["allCategoriesOfApi"];
  alertFavoriteGame: GamesState["alertFavoriteGame"];
  setNewGameToFavorite: (objectGame: Game) => void;
  onDeleteGameInFavorite: (favoriteGame: Game) => void;
  onActiveGame: (game: Game) => void;
  onResetActiveGame: () => void;
  resetAllGamesArray: () => void;
};

export type GamesState = {
  homeCard: {
    isHomeCardLoading: boolean;
    developer: string;
    freetogame_profile_url: string;
    game_url: string;
    genre: string;
    id: number;
    platform: string;
    publisher: string;
    release_date: string;
    short_description: string;
    thumbnail: string;
    title: string;
  };
  gamesSliders: {
    gamesSliderCategoryOne: {
      isGamesSlidersLoadingOne: boolean;
      categoryNameOne: string;
      gamesOne: Game[];
    };
    gamesSliderCategoryTwo: {
      isGamesSlidersLoadingTwo: boolean;
      categoryNameTwo: string;
      gamesTwo: Game[];
    };
    gamesSliderCategoryTr: {
      isGamesSlidersLoadingTr: boolean;
      categoryNameTr: string;
      gamesTr: Game[];
    };
  };
  homeCardsWithInformation: {
    isHomeCardsWithInformationLoading: boolean;
    homeCardsWithInformationArray: Game[] | null;
  };
  favoriteGames: {
    favoriteGamesArray: Game[];
    isFavoriteGamesLoading: boolean;
  };
  alertFavoriteGame: {
    isLoadingAlert: boolean;
    type: SweetAlertIcon | undefined;
    message: string;
  };
  activeGame: Game | null;
  allGames: {
    allGamesArray: Game[];
    isAllGamesArrayLoading: boolean;
  };
  allCategoriesOfApi: string[];
};

export type UIState = {
  isNavbarOpen: boolean;
  isCategoryFilterOpen: boolean;
};

export type UseUiStore = {
  isNavbarOpen: boolean;
  isCategoryFilterOpen: boolean;
  handleNavbarMobile: () => void;
  handleCategoryFilter: () => void;
};

export type UsePagination<T> = {
  renderPageNumbers: (JSX.Element | null)[];
  currentItems: T[];
  pageDecrementBtn: JSX.Element | null;
  pageIncrementBtn: JSX.Element | null;
  currentPage: number;
  pages: number[];
  handleNextPage: React.MouseEventHandler<HTMLLIElement>;
  handlePrevPage: React.MouseEventHandler<HTMLLIElement>;
};

export type UpcomingGames = {
  img: string;
  name: string;
  release_date: string;
};

// Interfaces

export interface HeaderPresentationProps {
  index: number;
}

export interface SlideButtonListProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface InputFormProps {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface AuthPayload {
  setImagesLoginAndRegister: string[];
  login: {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    errorMessage?: string | null;
  };
}

export interface GamesPayload {
  setHomeCard: Game;
  setGamesSliderOne: {
    categoryName: string;
    games: Game[];
  };
  setGamesSliderTwo: {
    categoryName: string;
    games: Game[];
  };
  setGamesSliderTr: {
    categoryName: string;
    games: Game[];
  };
  setHomeCardsWithInformation: Game[];
  setNewGameToFavoriteGames: Game;
  setAlertFavoriteGame: {
    type: SweetAlertIcon | undefined;
    message: string;
  };
  setFavoriteGames: Game[];
  deleteFavoriteGame: {
    id: number;
  };
  setActiveGame: Game;
  setAllGames: Game[];
}

export interface SliderGamesProps {
  games: Game[];
  categoryName: string;
}

export interface CardGameProps {
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  isLoading: boolean;
  objectGame: Game;
}

export interface UpcomingGameProps {
  img: string;
  name: string;
  release_date: string;
}

export interface CardFavoriteGameProps {
  thumbnail: string;
  title: string;
  favoriteGame: Game;
}

export interface PaginationProps {
  renderPageNumbers: (JSX.Element | null)[];
  pageDecrementBtn: JSX.Element | null;
  pageIncrementBtn: JSX.Element | null;
  currentPage: number;
  pages: number[];
  handleNextPage: React.MouseEventHandler<HTMLLIElement>;
  handlePrevPage: React.MouseEventHandler<HTMLLIElement>;
}

export interface OptionFilterProps {
  filterName: string;
  isFilterOpen: boolean;
  optionsArray: string[];
  filter: (value: string) => void;
  headerFunctionManage: React.MouseEventHandler<HTMLDivElement>;
}

export interface OptionFilterListItemProps {
  option: string;
  filterOption: (value: string) => void;
}

export interface CardGameInGamesProps {
  thumbnail: string;
  title: string;
  game: Game;
}
