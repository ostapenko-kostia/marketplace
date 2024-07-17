import { useState } from "react";
import Aside from "../../components/Aside/Aside";
import HomeListingCards from "../../components/HomeListingCards/HomeListingCards";
import style from "./styles.module.scss";

import Modal from "../../components/Modal/Modal";
import { IListing } from "../../interfaces";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listings] = useState<IListing[]>([
    {
      id: 1,
      name: "Test",
      category: "Other",
      description: "sdf",
      location: "test",
      price: 1,
      seller_email: "123@gmail.com",
      seller_name: "test",
    },
  ]);

  return (
    <div className={style.layoutContainer}>
      <Aside className="hidden-mobile" />
      <button
        onClick={() => setIsOpen(true)}
        className={`shown-mobile ${style.menuButton}`}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className={style.listings}>
        <div className={style.listingsLatest}>
          <h3>Latest</h3>
          <HomeListingCards listings={listings} />
        </div>
        <div className={style.listingsMy}>
          <h3>My Listings</h3>
          <HomeListingCards listings={listings} />
        </div>
      </div>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <Aside className="without-border" />
      </Modal>
    </div>
  );
}
