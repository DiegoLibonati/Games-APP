import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { IndexPage } from "./IndexPage";

import { gamesApi } from "../../../api/gamesApi";
import { store } from "../../../store/store";

import { REQUEST_GAMES_MOCK } from "../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const mock = new MockAdapter(gamesApi);
const categoryName = "1234";
const firstGame = REQUEST_GAMES_MOCK[0];

mock
  .onGet("/api/games", { params: { id: "452" } })
  .reply(200, REQUEST_GAMES_MOCK);

mock
  .onGet(`/api/games?category=${categoryName}`, { params: { id: "452" } })
  .reply(200, [firstGame]);

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <IndexPage></IndexPage>
      </MemoryRouter>
    </Provider>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

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

test("It must render the 'HomeImagesSection' section.", async () => {
  const { container } = await asyncRenderComponent();

  // eslint-disable-next-line
  const homeImagesSection = container.querySelector(
    ".home_container"
  ) as HTMLElement;

  expect(homeImagesSection).toBeInTheDocument();
});

test("It must render the 'CarouselsGamesSection' section.", async () => {
  const { container } = await asyncRenderComponent();

  // eslint-disable-next-line
  const carouselsGamesSection = container.querySelector(
    ".carousel_games_container"
  ) as HTMLElement;

  expect(carouselsGamesSection).toBeInTheDocument();
});

test("It must render the 'ShowGamesSection' section.", async () => {
  const { container } = await asyncRenderComponent();

  // eslint-disable-next-line
  const showGamesSection = container.querySelector(
    ".cards_games_section_container"
  ) as HTMLElement;

  expect(showGamesSection).toBeInTheDocument();
});

test("It must render the 'UpcomingGamesSection' section.", async () => {
  const { container } = await asyncRenderComponent();

  // eslint-disable-next-line
  const upcomingGamesSection = container.querySelector(
    ".upcoming_games_container"
  ) as HTMLElement;

  expect(upcomingGamesSection).toBeInTheDocument();
});

test("It must render the footer.", async () => {
  const { container } = await asyncRenderComponent();

  // eslint-disable-next-line
  const footer = container.querySelector("footer") as HTMLElement;

  expect(footer).toBeInTheDocument();
  expect(footer).toHaveClass("footer_container");
});
