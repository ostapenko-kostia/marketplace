import { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import { useGetFavoriteListings } from "../hooks/useListings";
import { useAppSelector } from "../store/store";

function FavoritePage() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const swiperRef = useRef<SwiperRef>(null);
  const { data: favListings } = useGetFavoriteListings(isAuth);

  return (
    <section className="my-3 mx-8">
      <ul className="list-none flex flex-col items-start">
        <li className="w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-2xl">Favorite Listings ❤️</h2>
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
            {favListings &&
              favListings.map((listing) => {
                return (
                  <SwiperSlide key={listing.listing_id}>
                    <Card isFavorite isMine={false} listing={listing} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </li>
      </ul>
    </section>
  );
}

export default FavoritePage;
