import logo from "../../assets/logo.png";
import "./NavBar.css";
import { Hamburger } from "./exports";
import { NavLink } from "react-router-dom";
import { useUiStore, useAuthStore } from "../../hooks/exports";

export const NavBar = (): JSX.Element => {
  const { isNavbarOpen } = useUiStore();
  const { displayName, photoURL, handleLogOut } = useAuthStore();

  return (
    <header className="header_container">
      <div className="header_container_logo">
        <img src={logo} alt="logo"></img>

        <Hamburger></Hamburger>
      </div>

      <nav
        className={
          isNavbarOpen
            ? "header_container_nav navbar_open"
            : "header_container_nav"
        }
      >
        <ul className="header_container_nav_list">
          <li className="header_container_nav_list_item">
            <NavLink
              to="/games/index"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Home
            </NavLink>
          </li>

          <li className="header_container_nav_list_item">
            <NavLink
              to="/games/favorite"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Favorite
            </NavLink>
          </li>

          <li className="header_container_nav_list_item">
            <NavLink
              to="/games/games"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              Games
            </NavLink>
          </li>
        </ul>

        <button className="button_logout" onClick={handleLogOut}>
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
