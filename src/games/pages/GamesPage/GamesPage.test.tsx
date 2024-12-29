import { screen, render } from "@testing-library/react";

import { MemoryRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";

import { Game } from "../../../entities/entities";

import { GamesPage } from "./GamesPage";

import { useUiStore } from "../../../hooks/useUiStore";
import { useGamesStore } from "../../../hooks/useGamesStore";
import { store } from "../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const mockHandleGetGamesByCategory = jest.fn();
const mockHandleSetToInitialState = jest.fn();

const mockHandleOpenFilterCategories = jest.fn();
const mockHandleCloseFilterCategories = jest.fn();

jest.mock("../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

jest.mock("../../../hooks/useUiStore", () => ({
  ...jest.requireActual("../../../hooks/useUiStore"),
  useUiStore: jest.fn(),
}));

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <GamesPage></GamesPage>
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
        <GamesPage></GamesPage>
      </MemoryRouter>
    </Provider>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

describe("If isLoadingGames is true.", () => {
  const games: Game[] = [];
  const isLoadingGames = true;
  const categories: string[] = [];

  const isFilterCategoriesOpen = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      games: games,
      isLoadingGames: isLoadingGames,
      categories: categories,
      handleGetGamesByCategory: mockHandleGetGamesByCategory,
      handleSetToInitialState: mockHandleSetToInitialState,
    });

    (useUiStore as jest.Mock).mockReturnValue({
      isFilterCategoriesOpen: isFilterCategoriesOpen,
      handleOpenFilterCategories: mockHandleOpenFilterCategories,
      handleCloseFilterCategories: mockHandleCloseFilterCategories,
    });

    (useLocation as jest.Mock).mockReturnValue({ search: "" });
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

describe("If isLoadingGames is false and there are not games.", () => {
  const games: Game[] = [];
  const isLoadingGames = false;
  const categories: string[] = [];

  const isFilterCategoriesOpen = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      games: games,
      isLoadingGames: isLoadingGames,
      categories: categories,
      handleGetGamesByCategory: mockHandleGetGamesByCategory,
      handleSetToInitialState: mockHandleSetToInitialState,
    });

    (useUiStore as jest.Mock).mockReturnValue({
      isFilterCategoriesOpen: isFilterCategoriesOpen,
      handleOpenFilterCategories: mockHandleOpenFilterCategories,
      handleCloseFilterCategories: mockHandleCloseFilterCategories,
    });

    (useLocation as jest.Mock).mockReturnValue({ search: "" });
  });

  test("It should render the message that there are no games.", () => {
    renderComponent();

    const heading = screen.getByRole("heading", {
      name: /¡That category does not exists!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

describe("If isLoadingGames is false and there are games.", () => {
  const games: Game[] = REQUEST_GAMES_MOCK;
  const isLoadingGames = false;
  const categories: string[] = [];

  const isFilterCategoriesOpen = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      games: games,
      isLoadingGames: isLoadingGames,
      categories: categories,
      handleGetGamesByCategory: mockHandleGetGamesByCategory,
      handleSetToInitialState: mockHandleSetToInitialState,
    });

    (useUiStore as jest.Mock).mockReturnValue({
      isFilterCategoriesOpen: isFilterCategoriesOpen,
      handleOpenFilterCategories: mockHandleOpenFilterCategories,
      handleCloseFilterCategories: mockHandleCloseFilterCategories,
    });

    (useLocation as jest.Mock).mockReturnValue({ search: "" });
  });

  test("It must render all games in favorites.", () => {
    renderComponent();

    const articles = screen.getAllByRole("article");
    const articleGameRoots = articles.filter((article) =>
      article.classList.contains("main_games_section_container_grid_games_game")
    );

    expect(articleGameRoots).toHaveLength(games.length);
  });
});

describe("General Tests.", () => {
  const games: Game[] = REQUEST_GAMES_MOCK;
  const isLoadingGames = false;
  const categories: string[] = [];

  const isFilterCategoriesOpen = false;

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      games: games,
      isLoadingGames: isLoadingGames,
      categories: categories,
      handleGetGamesByCategory: mockHandleGetGamesByCategory,
      handleSetToInitialState: mockHandleSetToInitialState,
    });

    (useUiStore as jest.Mock).mockReturnValue({
      isFilterCategoriesOpen: isFilterCategoriesOpen,
      handleOpenFilterCategories: mockHandleOpenFilterCategories,
      handleCloseFilterCategories: mockHandleCloseFilterCategories,
    });

    (useLocation as jest.Mock).mockReturnValue({ search: "" });
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
