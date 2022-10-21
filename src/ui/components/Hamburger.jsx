import { useUiStore } from "../../hooks/exports";
import "./Hamburger.css";

export const Hamburger = () => {
  const { isNavbarOpen, handleNavbarMobile } = useUiStore();

  return (
    <div
      onClick={handleNavbarMobile}
      className={isNavbarOpen ? "icon nav-icon-5 open" : "icon nav-icon-5"}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
