import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Game } from "../../../../entities/entities";

import { Provider } from "react-redux";

import { CardGame } from "./CardGame";

import { useGamesStore } from "../../../../hooks/useGamesStore";
import { store } from "../../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../../tests/jest.setup";

type RenderComponent = {
  props: { game: Game };
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
  const { container } = renderComponent();

  // eslint-disable-next-line
  const rootCard = container.querySelector(
    ".card_game_container"
  ) as HTMLDivElement;

  expect(rootCard).toBeInTheDocument();
  expect(rootCard).toHaveClass("card_game_container");
});

test("It must render the disk.", () => {
  const { props, container } = renderComponent();

  // eslint-disable-next-line
  const disk = container.querySelector(
    ".card_game_container_img"
  ) as HTMLDivElement;

  expect(disk).toBeInTheDocument();
  expect(disk).toHaveClass("card_game_container_img");
  expect(disk).toHaveStyle({ backgroundImage: `url(${props.game.thumbnail})` });
});

test("It must render the root of the information.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const rootInformation = container.querySelector(
    ".card_game_container_information"
  ) as HTMLDivElement;

  expect(rootInformation).toBeInTheDocument();
  expect(rootInformation).toHaveClass("card_game_container_information");
});

test("It must render the title, description, genre, platform, publisher, developer and release date.", () => {
  const { props } = renderComponent();

  const title = screen.getByRole("heading", { name: props.game.title });
  const description = screen.getByText(props.game.short_description);
  const genre = screen.getByRole("heading", {
    name: `Gender: ${props.game.genre}`,
  });
  const platform = screen.getByRole("heading", {
    name: `Platform: ${props.game.platform}`,
  });
  const publisher = screen.getByRole("heading", {
    name: `Published by: ${props.game.publisher}`,
  });
  const developer = screen.getByRole("heading", {
    name: `Developed by: ${props.game.developer}`,
  });
  const releaseDate = screen.getByRole("heading", {
    name: `Release date: ${props.game.release_date}`,
  });

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(genre).toBeInTheDocument();
  expect(platform).toBeInTheDocument();
  expect(publisher).toBeInTheDocument();
  expect(developer).toBeInTheDocument();
  expect(releaseDate).toBeInTheDocument();
});

test("It must render the link to the official website and also the add to favorites button. When you click on add to favorites, you must execute the relevant functions.", async () => {
  const { props } = renderComponent();

  const linkOfficialWebsite = screen.getByRole("link", {
    name: `go to official website ${props.game.title}`,
  });
  const btnAddToFavorites = screen.getByRole("button", {
    name: `add to favorites ${props.game.title}`,
  });

  expect(linkOfficialWebsite).toBeInTheDocument();
  expect(btnAddToFavorites).toBeInTheDocument();

  await user.click(btnAddToFavorites);

  expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledTimes(1);
  expect(mockHandleSetNewGameToFavorite).toHaveBeenCalledWith(props.game);
});

test("It should open the description when you click on the disk.", async () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const disk = container.querySelector(
    ".card_game_container_img"
  ) as HTMLDivElement;
  // eslint-disable-next-line
  const rootInformation = container.querySelector(
    ".card_game_container_information"
  ) as HTMLDivElement;

  expect(disk).toBeInTheDocument();
  expect(rootInformation).toBeInTheDocument();

  await user.click(disk);

  expect(
    // eslint-disable-next-line
    container.querySelector(".card_game_container_img") as HTMLDivElement
  ).toHaveClass("card_game_container_img_open");
  expect(
    // eslint-disable-next-line
    container.querySelector(
      ".card_game_container_information"
    ) as HTMLDivElement
  ).toHaveClass("open_information_card_game");
});

test("It should close the description when you double click on the disk.", async () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const disk = container.querySelector(
    ".card_game_container_img"
  ) as HTMLDivElement;

  expect(disk).toBeInTheDocument();

  await user.click(disk);

  expect(
    // eslint-disable-next-line
    container.querySelector(".card_game_container_img") as HTMLDivElement
  ).toHaveClass("card_game_container_img_open");
  expect(
    // eslint-disable-next-line
    container.querySelector(
      ".card_game_container_information"
    ) as HTMLDivElement
  ).toHaveClass("open_information_card_game");

  await user.dblClick(disk);

  expect(
    // eslint-disable-next-line
    container.querySelector(".card_game_container_img") as HTMLDivElement
  ).not.toHaveClass("card_game_container_img_open");
  expect(
    // eslint-disable-next-line
    container.querySelector(
      ".card_game_container_information"
    ) as HTMLDivElement
  ).not.toHaveClass("open_information_card_game");
});
