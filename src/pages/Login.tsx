import { useForm } from "react-hook-form";
import { login } from "../store/slices/AuthSlice";
import { useAppDispatch } from "../store/store";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <section className="mx-auto w-full px-5 pt-12 flex items-center flex-col">
      <h2 className="text-3xl">Log In</h2>
      <form
        className="flex w-96 max-xs:w-72 flex-col mt-5 gap-5"
        onSubmit={handleSubmit((data) => {
          dispatch(login({ email: data.email, password: data.password, cb: () => navigate({ pathname: "/" }) }));
        })}
      >
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 text-lg" htmlFor="login-email">
            <i className="fa-regular fa-envelope" /> Email
          </label>
          <input required {...register("email")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="text" placeholder="123@gmail.com" id="login-email" />
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="mb-2 text-lg flex justify-between items-center w-full" htmlFor="login-password">
            <div>
              <i className="fa-solid fa-lock" /> Password
            </div>
            <Link className="text-aqua text-sm" to="/forgot-password">Forgot Password?</Link>
          </label>
          <input
            required
            {...register("password")}
            autoComplete="on"
            className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl"
            type="password"
            placeholder="123456"
            id="login-password"
          />
        </div>
        <button className="bg-primary px-12 py-2 w-fit mx-auto text-lg rounded-xl" type="submit">
          Log In
        </button>
      </form>
    </section>
  );
}

export default Login;
