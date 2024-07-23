import { Link } from "react-router-dom";
import style from "./styles.module.scss";
import { useState } from "react";
import { useMutation } from "react-query";
import { AuthService } from "../../services/auth.service";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutateAsync: registerAsync } = useMutation(
    "register",
    () => AuthService.register(first_name, last_name, email, password),
    {
      onError: (error) => console.error(error),
      onSuccess: (data) => console.log(data),
    }
  );

  return (
    <section className={style.container}>
      <h2 className={style.title}>Sign Up</h2>
      <div className={style.content}>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            registerAsync();
          }}
        >
          <div className={style.firstNameContainer}>
            <label htmlFor="sigin-firstName">First Name</label>
            <input
              value={first_name}
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
              value={last_name}
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

export default SignUp;
