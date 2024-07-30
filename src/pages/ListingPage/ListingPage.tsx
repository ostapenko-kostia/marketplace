import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./styles.module.scss";
import { useGetAllListings } from "../../hooks/useListings";
import { useEffect } from "react";
import Image from "../../components/Image/Image";

export default function ListingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id || !listing) navigate({ pathname: "/404" });
  }, [id]);

  const { data: allListings } = useGetAllListings();
  const listing = allListings?.find((listing) => listing.listing_id === parseInt(id!));

  return listing ? (
    <section className={style.container}>
      <div className={style.mainWrapper}>
        <div className={style.header}>
          <h3 className={style.title}>{listing.name}</h3>
        </div>
        <div className={style.wrapper}>
          <Image image={listing.photo_ref} alt={listing.name} />
          <ul className={style.infoWrapper}>
            <li className={style.infoItem}>
              <b>Сategory</b>: {listing.category}
            </li>
            <li className={style.infoItem}>
              <b>Price</b>: <span className={style.green}>$</span>
              {listing.price}
            </li>
            <li className={style.infoItem}>
              <b>Location</b>: {listing.location}
            </li>
            <li className={style.infoItem}>
              <b>Seller`s First Name</b>: {listing.sellerFirstName}
            </li>
            <li className={style.infoItem}>
              <b>Seller`s Last Name</b>: {listing.sellerLastName}
            </li>
            <li className={style.infoItem}>
              <b>Seller`s Email</b>: {listing.sellerEmail}
            </li>
          </ul>
          <div className={style.footer}>{listing.description}</div>
        </div>
      </div>
    </section>
  ) : null;
}
