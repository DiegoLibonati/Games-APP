import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Game } from "../../../entities/entities";

import { FavoritePage } from "./FavoritePage";

import { useGamesStore } from "../../../hooks/useGamesStore";
import { store } from "../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const mockHandleGetFavoriteGames = jest.fn();
const mockHandleSetToInitialState = jest.fn();

jest.mock("../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <FavoritePage></FavoritePage>
      </MemoryRouter>
    </Provider>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <FavoritePage></FavoritePage>
      </MemoryRouter>
    </Provider>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

describe("If key 'isLoadingFavoriteGames' is true", () => {
  const favoritesGames: Game[] = [];
  const isLoadingFavoritesGames = true;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      favoritesGames: favoritesGames,
      isLoadingFavoritesGames: isLoadingFavoritesGames,
      handleGetFavoriteGames: mockHandleGetFavoriteGames,
      handleSetToInitialState: mockHandleSetToInitialState,
    });
  });

  test("It must render the loader.", () => {
    const { container } = renderComponent();

    // eslint-disable-next-line
    const loaderRoot = container.querySelector(
      ".loader_wrapper_all"
    ) as HTMLDivElement;
    // eslint-disable-next-line
    const loaderChild = loaderRoot!.querySelector(".loader") as HTMLDivElement;

    expect(loaderRoot).toBeInTheDocument();
    expect(loaderChild).toBeInTheDocument();
  });
});

describe("If key 'isLoadingFavoriteGames' is false and there are not favorite games.", () => {
  const favoritesGames: Game[] = [];
  const isLoadingFavoritesGames = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      favoritesGames: favoritesGames,
      isLoadingFavoritesGames: isLoadingFavoritesGames,
      handleGetFavoriteGames: mockHandleGetFavoriteGames,
      handleSetToInitialState: mockHandleSetToInitialState,
    });
  });

  test("It should render the message that there are no games in favorites.", () => {
    renderComponent();

    const heading = screen.getByRole("heading", {
      name: /Add a game to your favorites list/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

describe("If key 'isLoadingFavoriteGames' is false and there are favorite games.", () => {
  const favoritesGames: Game[] = REQUEST_GAMES_MOCK;
  const isLoadingFavoritesGames = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      favoritesGames: favoritesGames,
      isLoadingFavoritesGames: isLoadingFavoritesGames,
      handleGetFavoriteGames: mockHandleGetFavoriteGames,
      handleSetToInitialState: mockHandleSetToInitialState,
    });
  });

  test("It must render all games in favorites.", () => {
    renderComponent();

    const articles = screen.getAllByRole("article");
    const articleFavoriteGameRoots = articles.filter((article) =>
      article.classList.contains("card_favorite_container")
    );

    expect(articleFavoriteGameRoots).toHaveLength(favoritesGames.length);
  });
});

describe("General Tests.", () => {
  const favoritesGames: Game[] = REQUEST_GAMES_MOCK;
  const isLoadingFavoritesGames = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      favoritesGames: favoritesGames,
      isLoadingFavoritesGames: isLoadingFavoritesGames,
      handleGetFavoriteGames: mockHandleGetFavoriteGames,
      handleSetToInitialState: mockHandleSetToInitialState,
    });
  });

  test("It must render the navbar.", async () => {
    const { container } = await asyncRenderComponent();

    // eslint-disable-next-line
    const header = container.querySelector(".header_container") as HTMLElement;
    // eslint-disable-next-line
    const nav = container.querySelector("nav") as HTMLElement;

    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });

  test("It must render the main.", async () => {
    await asyncRenderComponent();

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });

  test("It must render the footer.", async () => {
    const { container } = await asyncRenderComponent();

    // eslint-disable-next-line
    const footer = container.querySelector("footer") as HTMLElement;

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("footer_container");
  });
});
