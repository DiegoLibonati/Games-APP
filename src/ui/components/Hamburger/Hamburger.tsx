import { useUiStore } from "../../../hooks/useUiStore";

import "./Hamburger.css";

export const Hamburger = (): JSX.Element => {
  const { isNavBarOpen, handleOpenNavBar, handleCloseNavBar } = useUiStore();

  return (
    <div
      onClick={isNavBarOpen ? handleCloseNavBar : handleOpenNavBar}
      className={isNavBarOpen ? "hamburger icon nav-icon-5 open" : "hamburger icon nav-icon-5"}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
