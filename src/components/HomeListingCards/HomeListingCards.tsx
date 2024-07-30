import { Link } from "react-router-dom";
import { IListing } from "../../interfaces";
import HomeListingCard from "../HomeListingCard/HomeListingCard";
import style from "./styles.module.scss";

interface Props {
  listings?: IListing[];
}

export default function HomeListingCards({ listings }: Props) {
  return (
    <div className={style.container}>
      {listings &&
        listings.map((listing) => (
          <Link key={listing.listing_id} to={`/listing?id=${listing.listing_id}`}>
            <HomeListingCard listing={listing} />
          </Link>
        ))}
    </div>
  );
}
