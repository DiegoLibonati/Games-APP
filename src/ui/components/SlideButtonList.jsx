import "./SlideButtonList.css";

export const SlideButtonList = ({ index, setIndex }) => {
  return (
    <div className="slide_button_container_main">
      <button
        onClick={() => setIndex(0)}
        className={
          index === 0 ? "slide_button slide_button_active" : "slide_button"
        }
      ></button>
      <button
        onClick={() => setIndex(1)}
        className={
          index === 1 ? "slide_button slide_button_active" : "slide_button"
        }
      ></button>
      <button
        onClick={() => setIndex(2)}
        className={
          index === 2 ? "slide_button slide_button_active" : "slide_button"
        }
      ></button>
    </div>
  );
};
