import { Link } from "react-router-dom";
import style from "./styles.module.scss";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../main";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useStore();

  return (
    <section className={style.container}>
      <h2 className={style.title}>Sign Up</h2>
      <div className={style.content}>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            store.register(firstName, lastName, email, password);
          }}
        >
          <div className={style.firstNameContainer}>
            <label htmlFor="sigin-firstName">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              id="signin-firstName"
              placeholder="Steve"
            />
          </div>
          <div className={style.lastNameContainer}>
            <label htmlFor="sigin-lastName">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              id="signin-lastName"
              placeholder="Jobs"
            />
          </div>
          <div className={style.emailContainer}>
            <label htmlFor="sigin-email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              id="signin-email"
              placeholder="123@gmail.com"
            />
          </div>
          <div className={style.emailContainer}>
            <label htmlFor="sigin-password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              type="password"
              id="signin-password"
              placeholder="123456"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <ul className={style.links}>
          <li>
            Already have an account? <Link to="/log-in">Log In</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default observer(SignUp);
