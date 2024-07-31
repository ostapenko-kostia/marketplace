import { Link } from "react-router-dom";
import { IListing } from "../../interfaces";
import Image from "../Image/Image";
import style from "./styles.module.scss";
import { usePutToFavorite } from "../../hooks/useListings";

interface Props {
  listing: IListing;
  isFavorite: boolean;
}

export default function HomeListingCard({ isFavorite, listing }: Props) {
  const { mutate: putToFavorite } = usePutToFavorite(listing.listing_id);
  function favBtnHandler() {
    if (isFavorite) {
      // delete
    } else {
      putToFavorite()
    }
  }
  return (
    <article className={style.card}>
      <button onClick={favBtnHandler} className={style.favBtn}>
        <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}></i>
      </button>
      <Link to={`/listing?id=${listing.listing_id}`}>
        <div className={style.container}>
          <Image image={listing?.photo_ref} alt="Listing Thumbnail" />
          <div className={style.body}>
            <div className={style.info}>
              <h4 className={style.title}>{listing.name}</h4>
              <span className={style.price}>
                <span className={style.green}>$</span>
                {listing.price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
