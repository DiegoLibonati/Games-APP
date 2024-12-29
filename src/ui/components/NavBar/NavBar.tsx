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
    <header className="header_container">
      <div className="header_container_logo">
        <img src={logo} alt="logo"></img>

        <Hamburger></Hamburger>
      </div>

      <nav
        className={
          isNavBarOpen
            ? "header_container_nav navbar_open"
            : "header_container_nav"
        }
      >
        <ul className="header_container_nav_list">
          <li className="header_container_nav_list_item">
            <NavLink
              to="/games/index"
              aria-label="go to home page"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Home
            </NavLink>
          </li>

          <li className="header_container_nav_list_item">
            <NavLink
              to="/games/favorite"
              aria-label="go to favorite page"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Favorite
            </NavLink>
          </li>

          <li className="header_container_nav_list_item">
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
          className="button_logout"
          onClick={handleLogOut}
          aria-label="logout button"
        >
          LogOut
        </button>

        <div className="header_container_nav_user">
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
