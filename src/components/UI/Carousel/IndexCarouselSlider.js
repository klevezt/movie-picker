import React from "react";
import { useState } from "react";
import SkeletonWithImage from "../Skeleton/SkeletonWithImage";

// Import Swiper React components
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const IndexCarouselSlider = ({ isLoading, content, headline, className }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const carouselMovies = content.map((movie, i) => {
    return (
      <SwiperSlide
        key={movie.id}
        virtualIndex={i}
        className="swiper-no-swiping"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`movie-${movie.title}`}
          className="mb-6 md:mb-0 swiper-lazy"
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
      ) : (
        <Swiper
          onSwiper={setSwiperRef}
          centeredSlides={true}
          slidesPerView={5}
          spaceBetween={30}
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
