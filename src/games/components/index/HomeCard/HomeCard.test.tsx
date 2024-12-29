import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { HomeCard } from "./HomeCard";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <HomeCard></HomeCard>
    </Provider>
  );

  return {
    container: container,
  };
};

describe("If game is not loading.", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      games: [],
      handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
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

  test("It must render the root with the corresponding class.", () => {
    renderComponent();

    const article = screen.getByRole("article");

    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("home_container_card effect_load");
  });
});

describe("If game is loading.", () => {
  const game = REQUEST_GAMES_MOCK[0];

  beforeEach(() => {
    jest.clearAllMocks();

    (useGamesStore as jest.Mock).mockReturnValue({
      games: [game],
      handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
    });
  });

  test("It must render the game image.", () => {
    renderComponent();

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", game.thumbnail);
    expect(img).toHaveAttribute("alt", game.title);
  });

  test("It must render the title, genre and publisher.", () => {
    renderComponent();

    const title = screen.getByRole("heading", { name: game.title });
    const genre = screen.getByRole("heading", { name: game.genre });
    const publisher = screen.getByRole("heading", { name: game.publisher });

    expect(title).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
  });

  test("It must render the add to favorite button. It must also execute the relevant functions when clicked.", async () => {
    renderComponent();

    const btnFavorite = screen.getByRole("button", {
      name: /add to favorite/i,
    });

    expect(btnFavorite).toBeInTheDocument();

    await user.click(btnFavorite);

    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(game);
  });
});
