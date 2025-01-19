import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { Hamburger } from "./Hamburger";

import { useUiStore } from "../../../hooks/useUiStore";
import { store } from "../../../store/store";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <Hamburger />
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("../../../hooks/useUiStore", () => ({
  ...jest.requireActual("../../../hooks/useUiStore"),
  useUiStore: jest.fn(),
}));

describe("Hamburger.tsx", () => {
  describe("If isNavBarOpen is 'true'.", () => {
    const mockHandleOpenNavBar = jest.fn();
    const mockHandleCloseNavBar = jest.fn();

    const isNavBarOpen = true;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
        handleCloseNavBar: mockHandleCloseNavBar,
        handleOpenNavBar: mockHandleOpenNavBar,
      });
    });

    test("It should render the root with the relevant classes and when clicked it should execute the relevant functions.", async () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const hamburger = container.querySelector(".hamburger") as HTMLDivElement;

      expect(hamburger).toBeInTheDocument();
      expect(hamburger).toHaveClass("hamburger icon nav-icon-5 open");

      await user.click(hamburger);

      expect(mockHandleCloseNavBar).toHaveBeenCalledTimes(1);
    });
  });

  describe("If isNavBarOpen is 'false'.", () => {
    const mockHandleOpenNavBar = jest.fn();
    const mockHandleCloseNavBar = jest.fn();

    const isNavBarOpen = false;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
        handleCloseNavBar: mockHandleCloseNavBar,
        handleOpenNavBar: mockHandleOpenNavBar,
      });
    });

    test("It should render the root with the relevant classes and when clicked it should execute the relevant functions.", async () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const hamburger = container.querySelector(".hamburger") as HTMLDivElement;

      expect(hamburger).toBeInTheDocument();
      expect(hamburger).toHaveClass("hamburger icon nav-icon-5");

      await user.click(hamburger);

      expect(mockHandleOpenNavBar).toHaveBeenCalledTimes(1);
    });
  });

  describe("General Tests", () => {
    const mockHandleOpenNavBar = jest.fn();
    const mockHandleCloseNavBar = jest.fn();

    const isNavBarOpen = false;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        isNavBarOpen: isNavBarOpen,
        handleCloseNavBar: mockHandleCloseNavBar,
        handleOpenNavBar: mockHandleOpenNavBar,
      });
    });

    test("It should render the hamburger icon menu.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const hamburger = container.querySelector(".hamburger") as HTMLDivElement;

      expect(hamburger).toBeInTheDocument();
      // eslint-disable-next-line
      expect(hamburger.children).toHaveLength(3);
    });
  });
});
