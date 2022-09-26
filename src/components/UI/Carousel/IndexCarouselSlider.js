import React from "react";
import { useState } from "react";
import SkeletonWithImage from "../Skeleton/SkeletonWithImage";

// Import Swiper React components
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const IndexCarouselSlider = ({
  isLoading,
  content,
  headline,
  className,
  reverseDirection,
  direction,
}) => {
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
        <NavLink to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={`movie-${movie.title}`}
            className="mb-6 md:mb-0 swiper-lazy hover:cursor-pointer "
          />
        </NavLink>
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
          breakpoints={{
            475: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 5,
            },
          }}
          dir={direction}
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
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
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
