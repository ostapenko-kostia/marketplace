import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";

interface Props {
  shownMobile: boolean;
  placeholder: string;
}

export default function Search({ shownMobile, placeholder }: Props) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  return (
    <search className={`${styles.container} ${shownMobile ? "shown-mobile" : "hidden-mobile"}`}>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleSubmit((data) => {
          const params = new URLSearchParams({
            name: data.search,
          });
          navigate({
            pathname: "/search",
            search: params.toString(),
          });
        })}
      >
        <button className={styles.button} type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input {...register("search")} className={styles.input} placeholder={placeholder} type="search" />
      </form>
    </search>
  );
}
