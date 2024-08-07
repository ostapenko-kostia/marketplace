import { IListing } from "../../interfaces";
import HomeListingCard from "../HomeListingCard/HomeListingCard";
import style from "./styles.module.scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useCallback, useRef } from "react";

interface Props {
  favoriteListings?: IListing[];
  listings?: IListing[];
  isMyListings?: boolean;
}

export default function HomeListingCards({ favoriteListings, listings, isMyListings = false }: Props) {
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className={style.mainWrapper}>
      <button className={style.prevBtn} onClick={handlePrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <Swiper
        ref={sliderRef}
        className={style.container}
        slidesPerView={3}
        modules={[Navigation]}
        breakpoints={{
          1366: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          860: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
      >
        {listings &&
          listings.map((listing) => (
            <SwiperSlide key={listing.listing_id}>
              <HomeListingCard isMyListing={isMyListings} isFavorite={!!favoriteListings?.find((favListing) => favListing.listing_id == listing.listing_id)} listing={listing} />
            </SwiperSlide>
          ))}
      </Swiper>
      <button className={style.nextBtn} onClick={handleNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
