import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Game } from "../../../../entities/entities";

import { Provider } from "react-redux";

import { CarouselGames } from "./CarouselGames";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../../tests/jest.setup";

type RenderComponent = {
  props: { name: string; games: Game[] };
  container: HTMLElement;
};

const mockHandleSetNewGameToFavorite = jest.fn();

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  (useGamesStore as jest.Mock).mockReturnValue({
    handleSetNewGameToFavorite: mockHandleSetNewGameToFavorite,
  });
});

const renderComponent = (): RenderComponent => {
  const props = {
    name: "pepe",
    games: REQUEST_GAMES_MOCK,
  };

  const { container } = render(
    <Provider store={store}>
      <CarouselGames games={props.games} name={props.name}></CarouselGames>
    </Provider>
  );

  return {
    props: props,
    container: container,
  };
};

test("It must render the root of the carousel with the corresponding class.", () => {
  renderComponent();

  const article = screen.getByRole("article");

  expect(article).toBeInTheDocument();
  expect(article).toHaveClass("carousel_games_container_carousel");
});

test("It must render the carousel title.", () => {
  const { props } = renderComponent();

  const heading = screen.getByRole("heading", { name: props.name });

  expect(heading).toBeInTheDocument();
});

test("It must render the carousel track with its respective class.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const track = container.querySelector(
    ".carousel_games_container_carousel_track"
  ) as HTMLDivElement;

  expect(track).toBeInTheDocument();
  expect(track).toHaveClass("carousel_games_container_carousel_track");
});

test("It must render the root of the card, with its image and button. Additionally, it must execute the relevant function when it is clicked.", async () => {
  const { props, container } = renderComponent();

  for (const game of props.games) {
    // eslint-disable-next-line
    const track = container.querySelector(`.game-${game.id}`) as HTMLDivElement;
    const img = screen.getByAltText(game.title);
    const btnAddToFav = screen.getByRole("button", {
      name: `add game to fav ${game.title}`,
    });

    expect(track).toBeInTheDocument();
    expect(track).toHaveClass("carousel-item");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", game.thumbnail);
    expect(img).toHaveAttribute("alt", game.title);
    expect(btnAddToFav).toBeInTheDocument();
    expect(btnAddToFav).toHaveClass("carousel-item-button");

    await user.click(btnAddToFav);

    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
    expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(game);

    jest.clearAllMocks()
  }
});
