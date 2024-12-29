import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";

import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { LoginPage } from "./LoginPage";

import { gamesApi } from "../../../api/gamesApi";
import { store } from "../../../store/store";

import {
  REQUEST_GAMES_MOCK,
  SLIDE_IMAGES_AUTH,
} from "../../../tests/jest.setup";
type RenderComponent = {
  container: HTMLElement;
};

const mock = new MockAdapter(gamesApi);

mock
  .onGet("/api/games", { params: { id: "452" } })
  .reply(200, REQUEST_GAMES_MOCK);

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </MemoryRouter>
  );

  await screen.findByRole("heading", { name: SLIDE_IMAGES_AUTH["0"] });

  return {
    container: container,
  };
};

describe("If the endpoint is getting and loading.", () => {
  test("It should show the loader.", async () => {
    const { container } = renderComponent();

    // eslint-disable-next-line
    const loader = container.querySelector(".loader_wrapper_all");

    expect(loader).toBeInTheDocument();

    await screen.findByRole("heading", { name: SLIDE_IMAGES_AUTH["0"] });
  });
});

describe("If the endpoint returns 200 with content.", () => {
  test("It should show the images obtained from the endpoint.", async () => {
    const firstImg = REQUEST_GAMES_MOCK[0].thumbnail;

    await asyncRenderComponent();

    const img = screen.getByAltText("loginimage");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", firstImg);
    expect(img).toHaveAttribute("alt", "loginimage");
  });
});
