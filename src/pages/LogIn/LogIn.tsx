import { Link, useNavigate } from "react-router-dom";
import style from "./styles.module.scss";
import { useState } from "react";
import { useAuthStore } from "../../store/store";

function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuthStore();

  return (
    <section className={style.container}>
      <h2 className={style.title}>Log In</h2>
      <div className={style.content}>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            login(email, password, () => navigate({ pathname: "/" }));
          }}
        >
          <div className={style.emailContainer}>
            <label htmlFor="sigin-email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} id="signin-email" required placeholder="123@gmail.com" />
          </div>
          <div className={style.emailContainer}>
            <label htmlFor="sigin-password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} required value={password} autoComplete="on" type="password" id="signin-password" placeholder="123456" />
          </div>
          <button type="submit">Log in</button>
        </form>
        <ul className={style.links}>
          <li>
            Don't have an account yet? <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default LogIn;
