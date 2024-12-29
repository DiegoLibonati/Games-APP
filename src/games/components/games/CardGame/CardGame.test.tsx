import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { CardGame } from "./CardGame";

import { Game } from "../../../../entities/entities";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../../tests/jest.setup";

type RenderComponent = {
  props: {
    game: Game;
  };
  container: HTMLElement;
};

const mockHandleSetActiveGame = jest.fn();

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  (useGamesStore as jest.Mock).mockReturnValue({
    handleSetActiveGame: mockHandleSetActiveGame,
  });
});

const renderComponent = (): RenderComponent => {
  const props = {
    game: REQUEST_GAMES_MOCK[0],
  };

  const { container } = render(
    <Provider store={store}>
      <CardGame game={props.game}></CardGame>
    </Provider>
  );

  return {
    props: props,
    container: container,
  };
};

test("It must render the root of the card.", () => {
  renderComponent();

  const root = screen.getByRole("article");

  expect(root).toBeInTheDocument();
  expect(root).toHaveClass("main_games_section_container_grid_games_game");
});

test("It must execute the relevant functions when the card is clicked.", async () => {
  const { props } = renderComponent();

  const root = screen.getByRole("article");

  expect(root).toBeInTheDocument();

  await user.click(root);

  expect(mockHandleSetActiveGame).toHaveBeenCalledTimes(1);
  expect(mockHandleSetActiveGame).toHaveBeenCalledWith(props.game);
});

test("It must render the image and the title of the game.", () => {
  const { props } = renderComponent();

  const img = screen.getByRole("img");
  const title = screen.getByRole("heading", { name: props.game.title });

  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", props.game.thumbnail);
  expect(img).toHaveAttribute("alt", props.game.title);
  expect(title).toBeInTheDocument();
});
