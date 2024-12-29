import { screen, render } from "@testing-library/react";

import { Provider } from "react-redux";

import { ShowGamesSection } from "./ShowGamesSection";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

jest.mock("../../../../hooks/useGamesStore", () => ({
  ...jest.requireActual("../../../../hooks/useGamesStore"),
  useGamesStore: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  (useGamesStore as jest.Mock).mockReturnValue({
    games: REQUEST_GAMES_MOCK,
  });
});

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <ShowGamesSection></ShowGamesSection>
    </Provider>
  );

  return {
    container: container,
  };
};

test("It must render the section title.", () => {
  renderComponent();

  const heading = screen.getByRole("heading", { name: /Other Games/i });

  expect(heading).toBeInTheDocument();
});

test("It must render all games.", () => {
  renderComponent();

  const articles = screen.getAllByRole("article");
  const articleGames = articles.find((article) =>
    article.classList.contains("card_games_section_container_list")
  );

  expect(articleGames).toBeInTheDocument();
  // eslint-disable-next-line
  expect(articleGames?.children).toHaveLength(
    REQUEST_GAMES_MOCK.length >= 12 ? 12 : REQUEST_GAMES_MOCK.length
  );
});
