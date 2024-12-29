import { screen, render } from "@testing-library/react";

import { Footer } from "./Footer";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Footer />);

  return {
    container: container,
  };
};

test("It must render the footer.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const footer = container.querySelector(".footer_container") as HTMLElement;

  expect(footer).toBeInTheDocument();
});

test("It must render all the links.", () => {
  const links = ["facebook", "github", "instagram", "linkedin"];

  renderComponent();

  for (const link of links) {
    const anchorLink = screen.getByRole("link", { name: `open ${link}` });

    expect(anchorLink).toBeInTheDocument();
  }
});
