import style from "./styles.module.scss";

interface Props {
  image?: string;
  alt: string;
}

export default function Image({ image, alt }: Props) {
  return (
    <div
      datatype="image-container"
      className={`img-container ${style.container}`}
    >
      {!image ? (
        <div className={style.placeholder} />
      ) : (
        <img className={style.img} src={image} alt={alt} />
      )}
    </div>
  );
}
