import { useState } from "react";
import Aside from "../../components/Aside/Aside";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import style from "./styles.module.scss";

import Modal from "../../components/Modal/Modal";
import { useAuthStore } from "../../store/store";
import { useGetAllListings, useGetMyListings } from "../../hooks/useListings";

export default function Home() {
  const { isAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: allListings, isLoading: isAllListingsLoading, isFetching: isAllListingsFetching } = useGetAllListings();
  const { data: myListings, isLoading: isMyListingLoading, isFetching: isMyListingFetching } = useGetMyListings(isAuth);

  return (
    <div className={style.layoutContainer}>
      <Aside className="hidden-mobile" />
      <button onClick={() => setIsOpen(true)} className={`shown-mobile ${style.menuButton}`}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className={style.listings}>
        <div className={style.listingsLatest}>
          <h3>All Listings</h3>
          {isAllListingsLoading || isAllListingsFetching ? "Loading..." : allListings ? <HomeListingCards listings={allListings} /> : "No Listings Found"}
        </div>
        <div className={style.listingsMy}>
          <h3>My Listings</h3>
          {isMyListingLoading || isMyListingFetching ? "Loading..." : myListings && isAuth ? <HomeListingCards listings={myListings} /> : "No Listings Found or You`re not Authorized"}
        </div>
      </div>

      <Modal title={<h2>Menu</h2>} isOpen={isOpen} close={() => setIsOpen(false)}>
        <Aside className="without-border" />
      </Modal>
    </div>
  );
}
