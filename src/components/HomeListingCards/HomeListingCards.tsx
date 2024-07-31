import { IListing } from "../../interfaces";
import HomeListingCard from "../HomeListingCard/HomeListingCard";
import style from "./styles.module.scss";

interface Props {
  favoriteListings?: IListing[];
  listings?: IListing[];
}

export default function HomeListingCards({ favoriteListings, listings }: Props) {
  return (
    <div className={style.container}>
      {listings &&
        listings.map((listing) => <HomeListingCard key={listing.listing_id} isFavorite={!!favoriteListings?.find((favListing) => favListing.listing_id == listing.listing_id)} listing={listing} />)}
    </div>
  );
}
