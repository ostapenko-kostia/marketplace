import style from "./styles.module.scss";

import { useState } from "react";
import { useAuthStore } from "../../store/store";
import { useGetAllListings, useGetFavoriteListings, useGetMyListings } from "../../hooks/useListings";

import Aside from "../../components/Aside/Aside";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import HomeListingsList from "../../components/HomeListingsList/HomeListingsList";

export default function Home() {
  const { isAuth } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allListings, isLoading: isAllListingsLoading, isFetching: isAllListingsFetching } = useGetAllListings();
  const { data: myListings, isLoading: isMyListingsLoading, isFetching: isMyListingsFetching } = useGetMyListings(isAuth);
  const { data: favoriteListings, isLoading: isFavoriteListingsLoading, isFetching: isFavoriteListingsFetching } = useGetFavoriteListings(isAuth);

  const [visibleAllListingsCount, setVisibleAllListingsCount] = useState(4);
  const showMoreAllListings = () => setVisibleAllListingsCount((prevCount) => prevCount + 4);

  return (
    <div className={style.layoutContainer}>
      <Aside className="hidden-mobile" />
      <button onClick={() => setIsModalOpen(true)} className={`shown-mobile ${style.menuButton}`}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className={style.listings}>
        <div className={style.listingsMy}>
          <h3>My Listings</h3>
          {isMyListingsLoading || isMyListingsFetching ? (
            "Loading..."
          ) : myListings && myListings.length > 0 && isAuth ? (
            <HomeListingCards isMyListings={true} favoriteListings={favoriteListings} listings={myListings} />
          ) : (
            "No listings found or you are not authorized"
          )}
        </div>
        <div className={style.listingsFav}>
          <h3>Favorite Listings</h3>
          {isFavoriteListingsLoading || isFavoriteListingsFetching ? (
            "Loading..."
          ) : favoriteListings && favoriteListings.length > 0 ? (
            <HomeListingCards favoriteListings={favoriteListings} listings={favoriteListings} />
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
              <HomeListingsList favListings={favoriteListings} listings={allListings.slice(0, visibleAllListingsCount)} />
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

      <Modal title={<h2>Menu</h2>} isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Aside className="without-border" />
      </Modal>
    </div>
  );
}
