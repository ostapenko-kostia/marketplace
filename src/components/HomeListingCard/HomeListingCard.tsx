import { IListing } from "../../interfaces";
import Image from "../Image/Image";
import style from "./styles.module.scss";

interface Props {
  listing: IListing;
}

export default function HomeListingCard({ listing }: Props) {
  return (
    <div className={style.container}>
      <Image image={listing?.photo_ref} alt="Listing Thumbnail" />
      <div className={style.info}>
        <h4 className={style.title}>{listing.name}</h4>
        <span className={style.price}><span className={style.green}>$</span>{listing.price}</span>
      </div>
    </div>
  );
}
