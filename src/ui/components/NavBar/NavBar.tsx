import { NavLink } from "react-router-dom";

import { useAuthStore } from "../../../hooks/useAuthStore";
import { useUiStore } from "../../../hooks/useUiStore";
import { Hamburger } from "../Hamburger/Hamburger";

import logo from "../../../assets/logo.png";
import "./NavBar.css";

export const NavBar = (): JSX.Element => {
  const { isNavBarOpen } = useUiStore();
  const { displayName, photoURL, handleLogOut } = useAuthStore();

  return (
    <header className="header__wrapper">
      <div className="header__logo">
        <img src={logo} alt="logo"></img>

        <Hamburger></Hamburger>
      </div>

      <nav
        className={
          isNavBarOpen
            ? "header__nav header__nav--open"
            : "header__nav"
        }
      >
        <ul className="header__list">
          <li className="header__list-item">
            <NavLink
              to="/games/index"
              aria-label="go to home page"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Home
            </NavLink>
          </li>

          <li className="header__list-item">
            <NavLink
              to="/games/favorite"
              aria-label="go to favorite page"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Favorite
            </NavLink>
          </li>

          <li className="header__list-item">
            <NavLink
              to="/games/games"
              aria-label="go to games page"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Games
            </NavLink>
          </li>
        </ul>

        <button
          className="btn__logout"
          onClick={handleLogOut}
          aria-label="logout button"
        >
          LogOut
        </button>

        <div className="header__user">
          <h2>{displayName}</h2>
          {photoURL ? (
            <img
              src={photoURL}
              referrerPolicy="no-referrer"
              alt={displayName!}
            ></img>
          ) : (
            <img src="http://i.imgur.com/AtBE7.png" alt="photoURL"></img>
          )}
        </div>
      </nav>
    </header>
  );
};
