import { useState } from "react";
import { changePass, resetPass } from "../store/slices/AuthSlice";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/store";

function ForgotPasswordPage() {
  type stepType = 1 | 2;
  const [step, setStep] = useState<stepType>(1);
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  return (
    <section className="mx-auto w-full px-5 pt-12 flex items-center flex-col">
      <h2 className="text-3xl mb-5">Forgot Password?</h2>
      {step === 1 ? (
        <form
          action="#"
          className="w-[500px] flex flex-col gap-5 max-sm:w-screen max-sm:px-12"
          onSubmit={handleSubmit((data) => {
            dispatch(resetPass({ email: data.email, cb: () => setStep(2) }));
          })}
        >
          <label className="mb-[-15px] text-lg" htmlFor="reset-email">
            <i className="fa-regular fa-envelope" /> Email
          </label>
          <input {...register("email")} required type="email" placeholder="123@gmail.com" className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" id="reset-email" />
          <button type="submit" className="bg-primary px-12 py-2 w-fit mx-auto text-lg rounded-xl max-xs:px-4 max-xs:text-base">
            Send Verification Code
          </button>
        </form>
      ) : (
        <form
          action="#"
          className="w-[500px] flex flex-col gap-5 max-sm:w-screen max-sm:px-12"
          onSubmit={handleSubmit((data) => {
            if (data.changePass == data.changeRepeatedPass) {
              dispatch(changePass({ email: data.changeEmail, code: data.changeCode, password: data.changePass, cb: () => alert("Password successfully changed") }));
            } else {
              alert("Passwords don't match");
            }
          })}
        >
          <label className="mb-[-15px] text-lg" htmlFor="change-email">
            <i className="fa-regular fa-envelope" /> Email
          </label>
          <input {...register("changeEmail")} required type="email" placeholder="123@gmail.com" className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" id="change-email" />
          <label className="mb-[-15px] text-lg" htmlFor="change-code">
            <i className="fa-solid fa-key" /> Code
          </label>
          <input {...register("changeCode")} required type="text" placeholder="GF25H4" className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" id="change-code" />
          <label className="mb-[-15px] text-lg" htmlFor="change-pass">
            <i className="fa-solid fa-lock" /> Password
          </label>
          <input {...register("changePass")} required type="password" placeholder="123456" className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" id="change-pass" />
          <label className="mb-[-15px] text-lg" htmlFor="change-repeatedpass">
            <i className="fa-solid fa-lock" /> Repeat Password
          </label>
          <input {...register("changeRepeatedPass")} required type="password" placeholder="123456" className="w-full border-gray border-solid border-[1px] px-5 py-2 rounded-xl" id="change-repeatedpass" />
          <button type="submit" className="bg-primary px-12 py-2 w-fit mx-auto text-lg rounded-xl">
            Change Password
          </button>
        </form>
      )}
    </section>
  );
}

export default ForgotPasswordPage;
