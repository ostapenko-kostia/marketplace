import styles from "./styles.module.scss";

interface Props {
  shownMobile: boolean;
  placeholder: string;
}

export default function Search({ shownMobile, placeholder }: Props) {
  return (
    <search
      className={`${styles.container} ${
        shownMobile ? "shown-mobile" : "hidden-mobile"
      }`}
    >
      <form className={styles.form} autoComplete="off">
        <button className={styles.button} type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input className={styles.input} placeholder={placeholder} type="search" />
      </form>
    </search>
  );
}
