import React from "react";
import { useState } from "react";
import SkeletonWithImage from "../Skeleton/SkeletonWithImage";

// Import Swiper React components
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

const IndexCarouselSlider = ({ isLoading, content, headline, className, reverseDirection}) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const authenticated = useSelector((state) => state.user.authenticated);

  const carouselMovies = content.map((movie, i) => {
    return (
      <SwiperSlide
        key={movie.id}
        virtualIndex={movie.id}
        className={`${!authenticated ? "swiper-no-swiping" : ""} `}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`movie-${movie.title}`}
          className="mb-6 md:mb-0 swiper-lazy"
        />
      </SwiperSlide>
    );
  });

  const carouselHoverableMovies = content.map((movie, i) => {
    return (
      <SwiperSlide
        key={movie.id}
        virtualIndex={movie.id}
        className={`${
          !authenticated ? "swiper-no-swiping" : ""
        } hover:scale-110 hover:z-10 duration-800`}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`movie-${movie.title}`}
          className="mb-6 md:mb-0 swiper-lazy hover:cursor-pointer "
        />
      </SwiperSlide>
    );
  });

  return (
    <div className={className}>
      {headline && (
        <>
          <h2 className="m-0 text-2xl">{headline}</h2>
          <hr className="my-1.5 md:my-6" />
        </>
      )}
      {isLoading ? (
        <SkeletonWithImage />
      ) : authenticated ? (
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={8}
          spaceBetween={5}
          virtual
          lazy
          navigation={true}
          speed={1000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: reverseDirection,
          }}
          modules={[Autoplay]}
          className="mySwiper "
        >
          {carouselHoverableMovies}
        </Swiper>
      ) : (
        <Swiper
          onSwiper={setSwiperRef}
          centeredSlides={true}
          slidesPerView={5}
          spaceBetween={30}
          speed={1000}
          lazy
          slideToClickedSlide
          virtual
          noSwiping
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper max-w-[95%]"
        >
          {carouselMovies}
        </Swiper>
      )}
    </div>
  );
};

export default IndexCarouselSlider;
