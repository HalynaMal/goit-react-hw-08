import css from "./Title.module.css";

export default function Title({ children }) {
  return <h1 className={css.title}>{children}</h1>;
}
