import { HeaderPresentationProps } from "../../entities/entities";
import "./HeaderPresentation.css";

export const HeaderPresentation = ({
  index,
}: HeaderPresentationProps): JSX.Element => {
  if (index === 0) {
    return <h1 className="header_presentation">The best free games wiki</h1>;
  }

  if (index === 1) {
    return <h1 className="header_presentation">Share with your friends</h1>;
  }

  return (
    <h1 className="header_presentation">
      Stay up to date with the latest news
    </h1>
  );
};
