import { useState } from "react";
import Aside from "../../components/Aside/Aside";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import style from "./styles.module.scss";

import Modal from "../../components/Modal/Modal";
import { useAuthStore } from "../../store/store";
import { useGetAllListings, useGetMyListings } from "../../hooks/useListings";
import Button from "../../components/Button/Button";

export default function Home() {
  const { isAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [visibleAllListingsCount, setVisibleAllListingsCount] = useState<number>(4);
  const [visibleMyListingsCount, setVisibleMyListingsCount] = useState<number>(4);

  const { data: allListings, isLoading: isAllListingsLoading, isFetching: isAllListingsFetching } = useGetAllListings();
  const { data: myListings, isLoading: isMyListingsLoading, isFetching: isMyListingsFetching } = useGetMyListings(isAuth);

  const handleShowMoreAllListings = () => {
    setVisibleAllListingsCount((prevCount) => prevCount + 4);
  };

  const handleShowMoreMyListings = () => {
    setVisibleMyListingsCount((prevCount) => prevCount + 4);
  };

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
              <HomeListingCards listings={myListings.slice(0, visibleMyListingsCount)} />
              {visibleMyListingsCount < myListings.length && <Button style={{marginTop: '20px'}} onClick={handleShowMoreMyListings}>See more</Button>}
            </>
          ) : (
            "No listings found or you are not authorized  "
          )}
        </div>
        <div className={style.listingsAll}>
          <h3>All Listings</h3>
          {isAllListingsLoading || isAllListingsFetching ? (
            "Loading..."
          ) : allListings && allListings.length > 0 ? (
            <>
              <HomeListingCards listings={allListings.slice(0, visibleAllListingsCount)} />
              {visibleAllListingsCount < allListings.length && <Button style={{marginTop: '20px'}} onClick={handleShowMoreAllListings}>See more</Button>}
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
