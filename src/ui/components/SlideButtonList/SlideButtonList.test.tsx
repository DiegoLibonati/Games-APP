import { screen, render } from "@testing-library/react";

import { SlideButtonList } from "./SlideButtonList";

import { SLIDE_IMAGES_AUTH } from "../../../tests/jest.setup";

type RenderComponent = {
  props: { index: number; handleSetIndex: jest.Mock };
  container: HTMLElement;
};

interface RenderComponentProps {
  index: number;
}

const renderComponent = ({ index }: RenderComponentProps): RenderComponent => {
  const props = {
    index: index,
    handleSetIndex: jest.fn(),
  };

  const { container } = render(
    <SlideButtonList
      index={props.index}
      handleSetIndex={props.handleSetIndex}
    />
  );

  return {
    props: props,
    container: container,
  };
};

test("It must render the root of the slide buttons.", () => {
  const { container } = renderComponent({ index: 0 });

  // eslint-disable-next-line
  const root = container.querySelector(
    ".slide_button_container_main"
  ) as HTMLDivElement;

  expect(root).toBeInTheDocument();
});

test("It must render all the buttons.", () => {
  renderComponent({ index: 0 });

  const keys = Object.keys(SLIDE_IMAGES_AUTH);

  for (const key of keys) {
    const btn = screen.getByRole("button", { name: `item-${key}` });

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("slide_button");
  }
});

test("Only button 0 must be active.", () => {
  renderComponent({ index: 0 });

  const keys = Object.keys(SLIDE_IMAGES_AUTH);

  for (const key of keys) {
    const btn = screen.getByRole("button", { name: `item-${key}` });

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass(
      key === "0" ? "slide_button slide_button_active" : "slide_button"
    );
  }
});
