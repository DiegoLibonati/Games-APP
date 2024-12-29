import { render } from "@testing-library/react";

import { CheckingAuth } from "./CheckingAuth";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<CheckingAuth />);

  return {
    container: container,
  };
};

test("It must render the auth loader.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const loaderRoot = container.querySelector(
    ".loader_wrapper"
  ) as HTMLDivElement;
  // eslint-disable-next-line
  const loaderAuth = loaderRoot!.querySelector(
    ".loader_checking_auth"
  ) as HTMLDivElement;

  expect(loaderRoot).toBeInTheDocument();
  expect(loaderAuth).toBeInTheDocument();
});
