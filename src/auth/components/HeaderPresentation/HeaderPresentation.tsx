import { GeneralProps } from "../../../entities/entities";

import "./HeaderPresentation.css";

interface HeaderPresentationProps extends GeneralProps {}

export const HeaderPresentation = ({
  children,
}: HeaderPresentationProps): JSX.Element => {
  return <h1 className="header_presentation">{children}</h1>;
};
