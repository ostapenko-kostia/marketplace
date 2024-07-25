import { useState } from "react";
import Aside from "../../components/Aside/Aside";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import style from "./styles.module.scss";

import Modal from "../../components/Modal/Modal";
import { IListing } from "../../interfaces";
import { useAuthStore } from "../../store/store";

interface Props {
  allListings: IListing[] | undefined;
  myListings: IListing[] | undefined;
}

export default function Home({ allListings, myListings }: Props) {
  const { isAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={style.layoutContainer}>
      <Aside className="hidden-mobile" />
      <button onClick={() => setIsOpen(true)} className={`shown-mobile ${style.menuButton}`}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className={style.listings}>
        <div className={style.listingsLatest}>
          <h3>All Listings</h3>
          {allListings ? <HomeListingCards listings={allListings} /> : "No Listings Found"}
        </div>
        <div className={style.listingsMy}>
          <h3>My Listings</h3>
          {myListings && isAuth ? <HomeListingCards listings={myListings} /> : "No listings found or you're not authorized"}
        </div>
      </div>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <Aside className="without-border" />
      </Modal>
    </div>
  );
}
