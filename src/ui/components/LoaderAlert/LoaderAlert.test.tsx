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

test("It must render the loader alert.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const loaderRoot = container.querySelector(
    ".loader_wrapper_all_screen"
  ) as HTMLDivElement;
  // eslint-disable-next-line
  const loaderChild = loaderRoot!.querySelector(".loader_all_screen") as HTMLDivElement;

  expect(loaderRoot).toBeInTheDocument();
  expect(loaderChild).toBeInTheDocument();
});
