import { useState } from "react";
import Aside from "../../components/Aside/Aside";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import style from "./styles.module.scss";

import Modal from "../../components/Modal/Modal";
import { useAuthStore } from "../../store/store";
import { useGetAllListings, useGetFavoriteListings, useGetMyListings } from "../../hooks/useListings";
import Button from "../../components/Button/Button";

export default function Home() {
  const { isAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [visibleAllListingsCount, setVisibleAllListingsCount] = useState<number>(4);
  const [visibleMyListingsCount, setVisibleMyListingsCount] = useState<number>(4);
  const [visibleFavListingsCount, setVisibleFavlistingsCount] = useState<number>(4);
  const showMoreAllListings = () => setVisibleAllListingsCount((prevCount) => prevCount + 4);
  const showMoreMyListings = () => setVisibleMyListingsCount((prevCount) => prevCount + 4);
  const showMoreFavListings = () => setVisibleFavlistingsCount((prevCount) => prevCount + 4);

  // const allListings:IListing[] = [{
  //   category: "Other",
  //   description: "132",
  //   listing_id: 1,
  //   location: '123',
  //   name: 'test',
  //   price: 1,
  //   sellerDetails: {
  //     sellerEmail: "123@gmail.com",
  //     sellerFirstName: "Alex",
  //     sellerLastName: "Test",
  //   },
  // }]

  // const isAllListingsLoading = false, isAllListingsFetching = false;

  const { data: allListings, isLoading: isAllListingsLoading, isFetching: isAllListingsFetching } = useGetAllListings();
  const { data: myListings, isLoading: isMyListingsLoading, isFetching: isMyListingsFetching } = useGetMyListings(isAuth);
  const { data: favoriteListings, isLoading: isFavListingsLoading, isFetching: isFavListingsFetching } = useGetFavoriteListings(isAuth);

  return (
    <div className={style.layoutContainer}>
      <Aside className="hidden-mobile" />
      <button onClick={() => setIsOpen(true)} className={`shown-mobile ${style.menuButton}`}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className={style.listings}>
        <div className={style.listingsMy}>
          <h3>My Listings</h3>
          {isMyListingsLoading || isMyListingsFetching ? (
            "Loading..."
          ) : myListings && myListings.length > 0 && isAuth ? (
            <>
              <HomeListingCards favoriteListings={favoriteListings} listings={myListings.slice(0, visibleMyListingsCount)} />
              {visibleMyListingsCount < myListings.length && (
                <Button style={{ marginTop: "20px" }} onClick={showMoreMyListings}>
                  See more
                </Button>
              )}
            </>
          ) : (
            "No listings found or you are not authorized  "
          )}
        </div>
        <div className={style.listingsFav}>
          <h3>Favorite Listings</h3>
          {isFavListingsFetching || isFavListingsLoading ? (
            "Loading..."
          ) : favoriteListings && favoriteListings.length > 0 ? (
            <>
              <HomeListingCards favoriteListings={favoriteListings} listings={favoriteListings.slice(0, visibleFavListingsCount)} />
              {visibleFavListingsCount < favoriteListings.length && (
                <Button style={{ marginTop: "20px" }} onClick={showMoreFavListings}>
                  See more
                </Button>
              )}
            </>
          ) : (
            "No listings found or you are not authorized"
          )}
        </div>
        <div className={style.listingsAll}>
          <h3>All Listings</h3>
          {isAllListingsLoading || isAllListingsFetching ? (
            "Loading..."
          ) : allListings && allListings.length > 0 ? (
            <>
              <HomeListingCards favoriteListings={favoriteListings} listings={allListings.slice(0, visibleAllListingsCount)} />
              {visibleAllListingsCount < allListings.length && (
                <Button style={{ marginTop: "20px" }} onClick={showMoreAllListings}>
                  See more
                </Button>
              )}
            </>
          ) : (
            "No listings found"
          )}
        </div>
      </div>

      <Modal title={<h2>Menu</h2>} isOpen={isOpen} close={() => setIsOpen(false)}>
        <Aside className="without-border" />
      </Modal>
    </div>
  );
}
