import "./SlideButtonList.css";

interface SlideButtonListProps {
  index: number;
  handleSetIndex: (index: number) => void;
}

export const SlideButtonList = ({
  index,
  handleSetIndex,
}: SlideButtonListProps): JSX.Element => {
  return (
    <div className="slide_button_container_main">
      <button
        type="button"
        aria-label="item-0"
        onClick={() => handleSetIndex(0)}
        className={
          index === 0 ? "slide_button slide_button_active" : "slide_button"
        }
      ></button>
      <button
        type="button"
        aria-label="item-1"
        onClick={() => handleSetIndex(1)}
        className={
          index === 1 ? "slide_button slide_button_active" : "slide_button"
        }
      ></button>
      <button
        type="button"
        aria-label="item-2"
        onClick={() => handleSetIndex(2)}
        className={
          index === 2 ? "slide_button slide_button_active" : "slide_button"
        }
      ></button>
    </div>
  );
};
