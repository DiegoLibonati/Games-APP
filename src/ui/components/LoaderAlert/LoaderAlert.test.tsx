import { render } from "@testing-library/react";

import { LoaderAlert } from "./LoaderAlert";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<LoaderAlert />);

  return {
    container: container,
  };
};

describe("LoaderAlert.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the loader alert.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const loaderRoot = container.querySelector(
        ".loader__alert-wrapper"
      ) as HTMLDivElement;
      // eslint-disable-next-line
      const loaderChild = loaderRoot!.querySelector(
        ".loader__alert"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loaderChild).toBeInTheDocument();
    });
  });
});
