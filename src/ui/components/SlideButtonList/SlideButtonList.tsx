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
    <div className="slide__btns">
      <button
        type="button"
        aria-label="item-0"
        onClick={() => handleSetIndex(0)}
        className={index === 0 ? "slide__btn slide__btn--active" : "slide__btn"}
      ></button>
      <button
        type="button"
        aria-label="item-1"
        onClick={() => handleSetIndex(1)}
        className={index === 1 ? "slide__btn slide__btn--active" : "slide__btn"}
      ></button>
      <button
        type="button"
        aria-label="item-2"
        onClick={() => handleSetIndex(2)}
        className={index === 2 ? "slide__btn slide__btn--active" : "slide__btn"}
      ></button>
    </div>
  );
};
