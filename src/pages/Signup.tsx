import { useForm } from "react-hook-form";
import { register as signup } from "../store/slices/AuthSlice";
import { useAppDispatch } from "../store/store";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  return (
    <section className="mx-auto w-full px-5 pt-12 flex items-center flex-col">
      <h2 className="text-3xl">Sign Up</h2>
      <form
        className="flex w-96 max-xs:w-72 flex-col mt-5 gap-5"
        onSubmit={handleSubmit((data) => {
          dispatch(signup({ photo: data.file[0], firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.password, cb: () => alert("Success! Please log in") }));
        })}
      >
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 text-lg" htmlFor="login-photo">
            <i className="fa-regular fa-image" /> Upload an Image
          </label>
          <input {...register("file")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="file" id="login-photo" />
        </div>
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 text-lg" htmlFor="login-email">
            <i className="fa-regular fa-user" /> First Name
          </label>
          <input required {...register("firstname")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="text" placeholder="Steve" id="login-firstname" />
        </div>
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 text-lg" htmlFor="login-email">
            <i className="fa-regular fa-user" /> Last Name
          </label>
          <input required {...register("lastname")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="text" placeholder="Jobs" id="login-lastname" />
        </div>
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 text-lg" htmlFor="login-email">
            <i className="fa-regular fa-envelope" /> Email
          </label>
          <input required {...register("email")} className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" type="email" placeholder="123@gmail.com" id="login-email" />
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="mb-2 text-lg" htmlFor="login-password">
            <i className="fa-solid fa-lock" /> Password
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
          Sign Up
        </button>
      </form>
    </section>
  );
}

export default Signup;
