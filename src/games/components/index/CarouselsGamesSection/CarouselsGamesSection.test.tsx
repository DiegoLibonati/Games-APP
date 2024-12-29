import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";

import { CarouselsGamesSection } from "./CarouselsGamesSection";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";
import { gamesApi } from "../../../../api/gamesApi";

import { REQUEST_GAMES_MOCK } from "../../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const categoryName = "MMORPG";

const mock = new MockAdapter(gamesApi);

mock
  .onGet(`/api/games?category=${categoryName}`, { params: { id: "452" } })
  .reply(200, REQUEST_GAMES_MOCK);

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  (useGamesStore as jest.Mock).mockReturnValue({
    categories: [categoryName],
  });
});

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <CarouselsGamesSection></CarouselsGamesSection>
    </Provider>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <Provider store={store}>
      <CarouselsGamesSection></CarouselsGamesSection>
    </Provider>
  );

  await screen.findByRole("heading", { name: categoryName });

  return {
    container: container,
  };
};

test("It must render the loader when you have not yet obtained the games of a category.", async () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const loaderRoot = container.querySelector(
    ".loader_wrapper_all"
  ) as HTMLDivElement;
  // eslint-disable-next-line
  const loaderParent = loaderRoot.parentElement as HTMLElement;
  // eslint-disable-next-line
  const loaderChild = loaderRoot!.querySelector(".loader") as HTMLDivElement;

  expect(loaderParent).toBeInTheDocument();
  expect(loaderParent).toHaveClass("carousel_games_container_carousel");
  expect(loaderRoot).toBeInTheDocument();
  expect(loaderChild).toBeInTheDocument();

  await screen.findByRole("heading", { name: categoryName });
});

test("It must render the carousel with the games obtained by the request.", async () => {
  const { container } = await asyncRenderComponent();

  const headingCategory = screen.getByRole("heading", { name: categoryName });

  expect(headingCategory).toBeInTheDocument();

  for (const game of REQUEST_GAMES_MOCK) {
    // eslint-disable-next-line
    const rootCard = container.querySelector(
      `.game-${game.id}`
    ) as HTMLDivElement;
    const imgGame = screen.getByAltText(game.title);
    const btnAddToFav = screen.getByRole("button", {
      name: `add game to fav ${game.title}`,
    });

    expect(rootCard).toBeInTheDocument();
    expect(imgGame).toBeInTheDocument();
    expect(imgGame).toHaveAttribute("src", game.thumbnail);
    expect(imgGame).toHaveAttribute("alt", game.title);
    expect(btnAddToFav).toBeInTheDocument();
  }
});
