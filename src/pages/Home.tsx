import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useGetAllListings, useGetFavoriteListings, useGetMyListings } from "../hooks/useListings";
import Card from "../components/Card";
import { useRef } from "react";
import { useAppSelector } from "../store/store";
import { Link } from "react-router-dom";

function Home() {
  const swiperRef = useRef<SwiperRef>(null);
  const { isAuth } = useAppSelector((state) => state.auth);

  const { data: allListings } = useGetAllListings();
  const { data: myListings } = useGetMyListings(isAuth);
  const { data: favListings } = useGetFavoriteListings(isAuth);

  return (
    <section className="my-3 mx-8">
      <div className="promotion relative rounded-3xl">
        <div className="absolute top-1/2 translate-y-[-50%] left-12 text-white flex flex-col items-start gap-2 max-sm:items-center max-sm:left-1/2 max-sm:translate-x-[-50%] max-sm:text-center">
          <h3 className="text-3xl font-bold max-sm:text-xl">Free Delivery!</h3>
          <p className="text-sm max-sm:text-xs">
            Don`t miss it out! Only today, get free Next Day
            <br />
            delivery on all of you orders.
          </p>
          <Link
            className="inline-block text-primary font-bold hover:bg-bg-color-alt hover:text-white bg-white text-sm py-3 px-7 rounded-3xl max-sm:text-xs max-sm:py-2 max-sm:px-3"
            to='/search?categories=All+Categories'
          >
            Browse Products
          </Link>
        </div>
      </div>
      <ul className="list-none flex flex-col items-start">
        <li className="w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-2xl">Latest Listings 🔥</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => swiperRef.current?.swiper.slidePrev()} className="w-[50px] h-[50px] rounded-3xl bg-bg-color">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button onClick={() => swiperRef.current?.swiper.slideNext()} className="w-[50px] h-[50px] rounded-3xl bg-bg-color">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <Swiper
            breakpoints={{ 960: { slidesPerView: 4 }, 600: { slidesPerView: 3 }, 425: { slidesPerView: 2 }, 0: { slidesPerView: 1 } }}
            ref={swiperRef}
            spaceBetween={30}
            slidesPerView={4}
            className="w-full mt-7"
          >
            {allListings &&
              allListings.map((listing) => {
                const isFavorite = favListings?.some((item) => item.listing_id === listing.listing_id);
                const isMine = myListings?.some((item) => item.listing_id === listing.listing_id);
                return (
                  <SwiperSlide key={listing.listing_id}>
                    <Card isFavorite={isFavorite} isMine={isMine} listing={listing} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </li>
      </ul>
    </section>
  );
}

export default Home;
