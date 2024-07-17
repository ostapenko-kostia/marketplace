import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./styles.module.scss";

export default function AuthButtons() {
  return (
    <div className={styles.container}>
      <Link to="/log-in">
        <Button>Log In?</Button>
      </Link>
      <Link to="/sign-up">
        <Button>Sign Up?</Button>
      </Link>
    </div>
  );
}
