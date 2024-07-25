import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  close: () => void;
  title?: JSX.Element;
}

function Modal({ children, isOpen, close, title }: Props) {
  return (
    <div className={styles.modal} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeaders}>
            {title}
            <button onClick={close} className={styles.button}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
