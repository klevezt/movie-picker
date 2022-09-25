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
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useEffect } from "react";
import useFetchSingleMovie from "../../_hooks/useFetchSingleMovie";
import { useCallback } from "react";

export const MovieThumbsSlider = ({ movie }) => {
  const fetchRef = useRef(() => {});

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, isLoading, list] = useFetchSingleMovie(
    `https://api.themoviedb.org/3/movie/${movie.id}/images`
  );

  fetchRef.current = useCallback(() => {
    list();
  }, [list]);

  useEffect(() => {
    fetchRef.current();
  }, []);

  const swipeSlider = images.posters?.map((image, i) => {
    return (
      <SwiperSlide key={i}>
        <img
          src={`https://image.tmdb.org/t/p/original${image.file_path}`}
          width="250px"
        />
      </SwiperSlide>
    );
  });

  // useEffect(()=>{
  //     const exec = async () => {
  //     }
  //     exec();
  // },[])

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 border-2"
      >
        {swipeSlider}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper3"
      >
        {swipeSlider}
      </Swiper>
    </>
  );
};
