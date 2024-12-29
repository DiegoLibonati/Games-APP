import { render } from "@testing-library/react";

import { Loader } from "./Loader";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);

  return {
    container: container,
  };
};

test("It must render the loader.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const loaderRoot = container.querySelector(
    ".loader_wrapper_all"
  ) as HTMLDivElement;
  // eslint-disable-next-line
  const loaderChild = loaderRoot!.querySelector(".loader") as HTMLDivElement;

  expect(loaderRoot).toBeInTheDocument();
  expect(loaderChild).toBeInTheDocument();
});
