import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

const Button: FC<React.HTMLAttributes<HTMLButtonElement & PropsWithChildren>> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
