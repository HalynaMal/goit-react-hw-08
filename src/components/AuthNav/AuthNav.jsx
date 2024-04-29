import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={css.container}>
      <NavLink to="/register" className={css.link}>
        Registration
      </NavLink>
      <NavLink to="/login" className={css.link}>
        LogIn
      </NavLink>
    </div>
  );
};

export default AuthNav;
