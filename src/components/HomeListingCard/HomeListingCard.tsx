import { Link, useNavigate } from "react-router-dom";
import { IListing } from "../../interfaces";
import Image from "../Image/Image";
import style from "./styles.module.scss";
import { useDeleteFromFavorite, useDeleteListing, usePutToFavorite } from "../../hooks/useListings";
import { useAuthStore } from "../../store/store";

interface Props {
  listing: IListing;
  isFavorite: boolean;
  isMyListing?: boolean;
  className?: string;
}

export default function HomeListingCard({ isFavorite, listing, isMyListing = false, className }: Props) {
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: putToFavorite } = usePutToFavorite(listing.listing_id);
  const { mutate: deleteFromFavorite } = useDeleteFromFavorite(listing.listing_id);
  const { mutate: deleteListing } = useDeleteListing(listing.listing_id);

  function favBtnHandler() {
    if (isAuth) {
      if (isFavorite) {
        deleteFromFavorite();
      } else {
        putToFavorite();
      }
    } else {
      navigate({ pathname: "/log-in" });
    }
  }
  return (
    <article className={`${className} ${style.card}`}>
      <div className={style.btns}>
        <button onClick={favBtnHandler} className={style.favBtn}>
          <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}></i>
        </button>
        {isMyListing && (
          <div className={style.onlyMyBtns}>
            <button onClick={() => deleteListing()} className={style.deleteBtn}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
            <button className={style.editBtn}>
              <i className="fa-regular fa-edit"></i>
            </button>
          </div>
        )}
      </div>

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
