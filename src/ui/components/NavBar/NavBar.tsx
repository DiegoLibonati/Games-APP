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
    <header className="header-wrapper">
      <div className="header-wrapper__menu">
        <img src={logo} alt="logo" className="header-wrapper__logo"></img>

        <Hamburger></Hamburger>
      </div>

      <nav
        className={
          isNavBarOpen
            ? "header-wrapper__nav header-wrapper__nav--open"
            : "header-wrapper__nav"
        }
      >
        <ul className="header-wrapper__list">
          <li className="header-wrapper__list-item">
            <NavLink
              to="/games/index"
              aria-label="go to home page"
              className={({ isActive }) =>
                isActive
                  ? "header-wrapper__link header-wrapper__link--active"
                  : "header-wrapper__link"
              }
            >
              Home
            </NavLink>
          </li>

          <li className="header-wrapper__list-item">
            <NavLink
              to="/games/favorite"
              aria-label="go to favorite page"
              className={({ isActive }) =>
                isActive
                  ? "header-wrapper__link header-wrapper__link--active"
                  : "header-wrapper__link"
              }
            >
              Favorite
            </NavLink>
          </li>

          <li className="header-wrapper__list-item">
            <NavLink
              to="/games/games"
              aria-label="go to games page"
              className={({ isActive }) =>
                isActive
                  ? "header-wrapper__link header-wrapper__link--active"
                  : "header-wrapper__link"
              }
            >
              Games
            </NavLink>
          </li>
        </ul>

        <button
          className="header-wrapper__logout"
          onClick={handleLogOut}
          aria-label="logout button"
        >
          LogOut
        </button>

        <div className="header-wrapper__user">
          <h2 className="header-wrapper__username">{displayName}</h2>
          {photoURL ? (
            <img
              src={photoURL}
              referrerPolicy="no-referrer"
              alt={displayName!}
              className="header-wrapper__avatar"
            ></img>
          ) : (
            <img
              src="http://i.imgur.com/AtBE7.png"
              alt="photoURL"
              className="header-wrapper__avatar"
            ></img>
          )}
        </div>
      </nav>
    </header>
  );
};
