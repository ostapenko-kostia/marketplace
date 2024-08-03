import { IListing } from "../../interfaces";
import HomeListingCard from "../HomeListingCard/HomeListingCard";
import style from "./styles.module.scss";

interface Props {
  listings: IListing[];
  favListings?: IListing[];
}

function HomeListingsList({ listings, favListings }: Props) {
  return (
    <div className={style.container}>
      {listings
        ? listings.map((listing) => <HomeListingCard className='home-card' listing={listing} isFavorite={!!favListings?.find((favListing) => favListing.listing_id == listing.listing_id)} key={listing.listing_id} />)
        : null}
    </div>
  );
}

export default HomeListingsList;
