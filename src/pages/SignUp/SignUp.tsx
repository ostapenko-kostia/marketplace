import { Link } from "react-router-dom";
import style from "./styles.module.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Modal from "../../components/Modal/Modal";
import { useAuthStore } from "../../store/store";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { register } = useAuthStore();

  const { mutate: signup, isSuccess: isSuccess2 } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async () => {
      register(firstName, lastName, email, password);
      setIsSuccess(isSuccess2);
    },
  });
  return (
    <section className={style.container}>
      <h2 className={style.title}>Sign Up</h2>
      <div className={style.content}>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <div className={style.firstNameContainer}>
            <label htmlFor="sigin-firstName">First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text" id="signin-firstName" placeholder="Steve" />
          </div>
          <div className={style.lastNameContainer}>
            <label htmlFor="sigin-lastName">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text" id="signin-lastName" placeholder="Jobs" />
          </div>
          <div className={style.emailContainer}>
            <label htmlFor="sigin-email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" id="signin-email" placeholder="123@gmail.com" />
          </div>
          <div className={style.emailContainer}>
            <label htmlFor="sigin-password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" type="password" id="signin-password" placeholder="123456" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <ul className={style.links}>
          <li>
            Already have an account? <Link to="/log-in">Log In</Link>
          </li>
        </ul>
      </div>

      <Modal title={<h2>Success</h2>} isOpen={isSuccess} close={() => setIsSuccess(false)}>
        You have successfully registered, please <Link to="/log-in">log in</Link>
      </Modal>
    </section>
  );
}

export default SignUp;
