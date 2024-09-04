import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import  "./styling.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
import { useEffect } from "react";
import useFetchSingleMovie from "../../_hooks/useFetchSingleMovie";
import { useCallback } from "react";

export const MovieThumbsSlider = ({ movie }) => {
  const fetchRef = useRef(() => {});

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [images, isLoading, list] = useFetchSingleMovie(
    `https://api.themoviedb.org/3/movie/${movie.id}/images`
  );

  fetchRef.current = useCallback(() => {
    list();
  }, [list]);

  useEffect(() => {
    fetchRef.current();
  }, []);

  const swipeSlider = images.backdrops?.map((image, i) => {
    if (image.iso_639_1 === null) {
      return (
        <SwiperSlide key={i}>
          <img
            src={`https://image.tmdb.org/t/p/original${image.file_path}`}
            alt={image.file_path}
          />
        </SwiperSlide>
      );
    }
    return null;
  });

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 4000,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-1"
      >
        {swipeSlider}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={5}
        freeMode={true}
        autoplay={{
          delay: 2000,
        }}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper3"
      >
        {swipeSlider}
      </Swiper>
    </>
  );
};
