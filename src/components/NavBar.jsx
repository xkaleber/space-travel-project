import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const linkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.active : ""}`;

  return (
    <nav className={styles.navBar}>
      <NavLink to="/" end className={linkClass}>
        🌍 Home
      </NavLink>

      <NavLink to="/spacecrafts" className={linkClass}>
        🚀 Spacecrafts
      </NavLink>

      <NavLink to="/planets" className={linkClass}>
        🪐 Planets
      </NavLink>
    </nav>
  );
}

export default NavBar;
